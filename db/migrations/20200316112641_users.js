exports.up = function(knex) {
  return knex.schema.createTable('users', usersTable => {
    usersTable
      .string('username')
      .primary()
      .unique()
      .notNullable();
    usersTable
      .string('avatar_url')
      .unique()
      .notNullable();
    usersTable
      .string('name')
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
