const { pool } = require("../config/database");

const EventSeat = {
  async bulkCreate(seats) {
    const query = `
      INSERT INTO public.event_seats 
      (event_id, seat_id, section, row, x, y, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    for (const seat of seats) {
      await pool.query(query, [
        seat.eventId,
        seat.seatId,
        seat.section,
        seat.row,
        seat.x,
        seat.y,
        seat.status || "available",
      ]);
    }
  },

  async findByEventId(eventId) {
    const result = await pool.query(
      `SELECT seat_id AS "seatId", section, row, x, y, status
       FROM public.event_seats
       WHERE event_id = $1`,
      [eventId],
    );

    return result.rows;
  },
};

module.exports = EventSeat;
