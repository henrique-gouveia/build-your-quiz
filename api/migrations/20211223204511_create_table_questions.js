
exports.up = function(knex, Promise) {
    return knex.schema.createTable('questions', table => {
        table.increments('id').primary()
        table.string('title', 500).notNull()
        table.binary('text')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('questions')
};
