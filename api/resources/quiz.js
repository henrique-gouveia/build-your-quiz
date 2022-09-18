const uuid = require('uuid')

module.exports = app => {
    const { existsOrError, greaterOrEqualThanOrError } = app.assertions

    const save = async (req, res) => {
        const quiz = { ...req.body }
        if (req.params.id) quiz.id = req.params.id

        try {
            existsOrError(quiz.count, 'Total Questions should be informed')
        } catch (err) {
            return res.status(400).send(err)
        }

        try {
            await insertQuiz(quiz)
            res.status(204).send()
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const insertQuiz = async (quiz) => {
        quiz.id = uuid.v4()

        const questions = await raffleQuestions(quiz.count)
        const quizQuestions = questions.map(q => ({
            quizId: quiz.id,
            questionId: q.id
        }))

        await app.db('quizes').insert(quiz)
        await app.db('quizes_questions').insert(quizQuestions)
    }

    const raffleQuestions = async (count) => {
        let questions = await app.db('questions').select('id')

        existsOrError(questions, 'There are no questions')
        greaterOrEqualThanOrError(questions.length, count, `There are no sufficient questions, only ${questions.length}`)

        let maxCount = count
        if (questions.length < count) maxCount = questions.length

        const raffle = () => {
            const idx = Math.floor(Math.random() * questions.length);
            const question = questions[idx]

            questions = questions.filter(q => q.id !== question.id)

            return question
        }

        const raffledQuestions = [];
        for (let i = 0; i < maxCount; i++) {
            raffledQuestions.push(raffle())
        }

        return raffledQuestions
    }

    const remove = async (req, res) => {
        try {
            const quizId = req.params.id
            existsOrError(quizId, 'Quiz Id should be informed')

            await app.db('quizes_questions').where({ quizId }).del()
            const rowsDeleted = await app.db('quizes').where({ id: quizId }).del()

            existsOrError(rowsDeleted, 'Quiz not found')

            res.status(204).send()
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    const limit = 5

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('quizes').count('id').first()
        const count = parseInt(result.count)

        app.db('quizes')
            .select('id', 'count')
            .limit(limit).offset(page * limit - limit)
            .then(quizes => res.json({ data: quizes, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        try {
            const quizes = await app.db('quizes')
                .select('id', 'count')
                .where({ id: req.params.id })
                .first()

            res.json(quizes)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const getQuestionsByQuizId = async (req, res) => {
        try {
            const quizId = req.params.id
            existsOrError(quizId, 'Quiz Id should be informed')

            let questions = await app.db({ qq: 'quizes_questions' })
                .innerJoin({ q: 'questions' }, 'qq.questionId', 'q.id')
                .select('qq.quizId', 'q.id', 'q.title', 'q.text')
                .where({ 'qq.quizId': quizId })
            existsOrError(questions, 'There are no questions for this quiz')

            questions = await Promise.all(questions.map(async (q) => {
                const answers = await app.db('question_answers')
                    .select('questionId', 'option', 'title', 'correct')
                    .where({ questionId: q.id })

                return {
                    ...q,
                    text: (q.text || '').toString(),
                    answers
                }
            }))

            res.json(questions)
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    return { save, remove, get, getById, getQuestionsByQuizId }
}
