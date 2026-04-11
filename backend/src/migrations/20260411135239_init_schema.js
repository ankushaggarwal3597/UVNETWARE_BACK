exports.up = function (knex) {
  return knex.schema

    // layouts table
    .createTable("layouts", (table) => {
      table.increments("id").primary();

      table.text("layout_name").notNullable();
      table.text("layout_type").notNullable();
      table.text("user_name");

      table.boolean("is_template").defaultTo(true);

      table.jsonb("layout_data").notNullable();

      table.timestamp("created_at")
           .defaultTo(knex.fn.now())
           .notNullable();
    })

    // layout_seats table
    .createTable("layout_seats", (table) => {
      table.increments("id").primary();

      table
        .integer("layout_id")
        .references("id")
        .inTable("layouts")
        .onDelete("CASCADE");

      table.text("seat_id").notNullable();

      table.text("row");
      table.integer("number");
      table.text("label");

      table.float("x");
      table.float("y");

      table.text("status").defaultTo("available");

      table.jsonb("metadata");

      table.timestamp("created_at")
           .defaultTo(knex.fn.now())
           .notNullable();

      table.unique(["layout_id", "seat_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("layout_seats")
    .dropTableIfExists("layouts");
};