const { pool } = require("../config/database");

const LayoutSeat = {
  async bulkCreate(seats) {
    const query = `
      INSERT INTO layout_seats 
      (layout_id, seat_id, section, row, x, y, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    for (const seat of seats) {
      await pool.query(query, [
        seat.layoutId,  // layoutId instead of eventId
        seat.seatId,
        seat.section,
        seat.row,
        seat.x,
        seat.y,
        seat.status || "available",
      ]);
    }
  },

  async findByLayoutId(layoutId) {
    const result = await pool.query(
      `SELECT 
        seat_id AS "seatId", 
        section, 
        row, 
        x, 
        y, 
        status
       FROM layout_seats
       WHERE layout_id = $1`,
      [layoutId]
    );

    return result.rows;
  },
};

module.exports = LayoutSeat;