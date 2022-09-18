exports.up = function(knex, Promise) {
    return knex.schema.createTable('quizes_questions', table => {
        table.increments('id').primary()
        table.string('quizId').references('id').inTable('quizes').notNull()
        table.integer('questionId').references('id').inTable('questions').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('quizes_questions')
};
