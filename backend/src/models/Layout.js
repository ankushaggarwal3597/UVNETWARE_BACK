const { pool } = require("../config/database");

const Layout = {
  async create(layoutName, layoutType, layoutData) {
    const query = `
      INSERT INTO layouts (layout_name, layout_type, layout_data)
      VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [layoutName, layoutType, layoutData];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(
      "SELECT id, layout_name, layout_type FROM layouts"
    );
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query(
      "SELECT * FROM layouts WHERE id=$1",
      [id]
    );
    return result.rows[0];
  },
};

module.exports = Layout;