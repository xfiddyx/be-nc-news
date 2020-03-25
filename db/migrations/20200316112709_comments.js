exports.up = function(knex) {
  return knex.schema.createTable('comments', commentsTable => {
    commentsTable
      .increments('comment_id')
      .primary()
      .unique();
    commentsTable
      .string('author')
      .references('users.username')
      .notNullable();
    commentsTable
      .integer('article_id')
      .references('articles.article_id')
      .onDelete('CASCADE');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.timestamp('created_at').defaultTo(knex.fn.now());
    commentsTable.string('body', 1500).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
