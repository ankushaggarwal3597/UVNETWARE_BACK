const { pool } = require("../config/database");

const Event = {
  async create(eventName, layoutId, eventDate) {
    const query = `
      INSERT INTO events (event_name, layout_id, event_date)
      VALUES ($1, $2, $3)
      RETURNING id, event_name, layout_id, event_date, created_at
    `;

    const values = [eventName, layoutId, eventDate];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findAll() {
    const query = `
      SELECT id, event_name AS "eventName", layout_id AS "layoutId", event_date AS "eventDate", created_at
      FROM events
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async findById(id) {
    const query = `
      SELECT id, event_name AS "eventName", layout_id AS "layoutId", event_date AS "eventDate", created_at
      FROM events
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

module.exports = Event;
