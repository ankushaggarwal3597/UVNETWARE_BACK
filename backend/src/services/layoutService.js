const Layout = require("../models/Layout");
const { pool } = require("../config/database");
const generateSeatsFromLayout = require("../utils/seatGenerator");

// CREATE
const saveLayout = async (data) => {
  const { layoutName, layoutType, layoutData } = data;
  return await Layout.create(layoutName, layoutType, layoutData);
};

// READ
const getLayouts = async () => {
  return await Layout.findAll();
};

const getLayoutById = async (id) => {
  return await Layout.findById(id);
};

// UPDATE + REGENERATE SEATS
const updateLayoutWithSeats = async (layoutId, data) => {
  const { layoutName, layoutType, layoutData } = data;

  // Step 1: Prevent update if any seat is booked
  const bookedSeats = await pool.query(
    `SELECT 1 FROM layout_seats 
     WHERE layout_id=$1 AND status='booked' LIMIT 1`,
    [layoutId]
  );

  if (bookedSeats.rowCount > 0) {
    const error = new Error("Cannot update layout: some seats are already booked");
    error.status = 400;
    throw error;
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Step 2: Update layout
    const updatedLayout = await client.query(
      `UPDATE layouts
       SET layout_name=$1, layout_type=$2, layout_data=$3
       WHERE id=$4
       RETURNING *`,
      [layoutName, layoutType, layoutData, layoutId]
    );

    // Step 3: Delete old seats
    await client.query(
      `DELETE FROM layout_seats WHERE layout_id=$1`,
      [layoutId]
    );

    // Step 4: Generate new seats
    const newSeats = generateSeatsFromLayout(layoutId, layoutData);

    const insertQuery = `
      INSERT INTO layout_seats 
      (layout_id, seat_id, row, number, label, x, y, status, metadata)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `;

    for (const seat of newSeats) {
      await client.query(insertQuery, [
        seat.layoutId,
        seat.seatId,
        seat.row || null,
        seat.number || null,
        seat.label || null,
        seat.x,
        seat.y,
        "available",
        seat
      ]);
    }

    await client.query("COMMIT");

    return {
      message: "Layout updated and seats regenerated successfully",
      layout: updatedLayout.rows[0],
      totalSeats: newSeats.length
    };

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  saveLayout,
  getLayouts,
  getLayoutById,
  updateLayoutWithSeats
};