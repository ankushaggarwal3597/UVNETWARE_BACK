const { pool } = require("../config/database");

const LayoutSeat = {
  async bulkCreate(seats) {
    const query = `
      INSERT INTO layout_seats 
      (layout_id, seat_id, row, number, label, x, y, status, metadata)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    for (const seat of seats) {
      await pool.query(query, [
        seat.layoutId,
        seat.seatId,
        seat.row || null,
        seat.number || null,
        seat.label || null,
        seat.x,
        seat.y,
        seat.status || "available",

        // 🔥 flexible data goes here
        {
          section: seat.section,
          groupId: seat.groupId,
          groupType: seat.groupType,
          arcId: seat.arcId,
          arcCenterX: seat.arcCenterX,
          arcCenterY: seat.arcCenterY,
          arcRadius: seat.arcRadius,
          arcAngle: seat.arcAngle,
          arcRotation: seat.arcRotation,
          arcSeatIndex: seat.arcSeatIndex,
          coachId: seat.coachId,
          berthType: seat.berthType,
          busRole: seat.busRole,
          ...seat // optional full dump
        }
      ]);
    }
  },

  async findByLayoutId(layoutId) {
    const result = await pool.query(
      `SELECT 
        seat_id AS "seatId",
        row,
        number,
        label,
        x,
        y,
        status,
        metadata
       FROM layout_seats
       WHERE layout_id = $1`,
      [layoutId]
    );

    // Optional: map metadata back to frontend-friendly fields
    return result.rows.map(seat => ({
      ...seat,
      section: seat.metadata?.section
    }));
  },
};

module.exports = LayoutSeat;