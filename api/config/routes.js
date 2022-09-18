module.exports = app => {
    app.get('/', (req, res) => res.send('ByQuiz Api is Running...'))

    app.route('/questions')
        .get(app.resources.question.get)
        .post(app.resources.question.save)

    app.route('/questions/:id')
        .get(app.resources.question.getById)
        .put(app.resources.question.save)
        .delete(app.resources.question.remove)

    app.route('/quizes')
        .get(app.resources.quiz.get)
        .post(app.resources.quiz.save)

    app.route('/quizes/:id')
        .get(app.resources.quiz.getById)
        .delete(app.resources.quiz.remove)

    app.get('/quizes/:id/questions', app.resources.quiz.getQuestionsByQuizId)
}
