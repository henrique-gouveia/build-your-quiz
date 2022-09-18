
exports.up = function(knex, Promise) {
    return knex.schema.createTable('question_answers', table => {
        table.integer('questionId').references('id').inTable('questions').notNull()
        table.integer('option').notNull()
        table.string('title').notNull()
        table.boolean('correct').notNull()
        table.primary(['questionId', 'option'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('question_answers')
};
