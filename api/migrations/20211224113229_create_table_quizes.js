exports.up = function(knex, Promise) {
    return knex.schema.createTable('quizes', table => {
        table.string('id').primary()
        table.integer('count').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('quizes')
};
