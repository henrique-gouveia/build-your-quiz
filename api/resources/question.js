module.exports = app => {
    const { existsOrError } = app.assertions

    const save = async (req, res) => {
        const question = { ...req.body }
        if (req.params.id) question.id = req.params.id

        try {
            existsOrError(question.title, 'Title should be informed')
            existsOrError(question.answers, 'Answers should be informed')
        } catch (err) {
            return res.status(400).send(err)
        }

        try {
            if (question.id) {
                await updateQuestion(question)
            } else {
                await insertquestion(question)
            }
            res.status(204).send()
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const insertquestion = async (question) => {
        const { answers } = question
        delete question.id
        delete question.answers

        const questionId = await app.db('questions').insert(question).returning('id')
        await saveAnswers(+questionId[0], answers)
    }

    const updateQuestion = async (question) => {
        const { answers } = question
        delete question.answers

        await app.db('questions').update(question).where({ id: question.id })
        await saveAnswers(+question.id, answers)
    }

    const saveAnswers = async (questionId, answers) => {
        answers = answers.map(r => ({ ...r, questionId }))

        await app.db('question_answers').where({ questionId }).del()
        await app.db('question_answers').insert(answers)
    }

    const remove = async (req, res) => {
        try {
            const questionId = req.params.id
            existsOrError(questionId, 'Question id should be informed')

            await app.db('question_answers').where({ questionId: questionId }).del()
            const rowsDeleted = await app.db('questions').where({ id: questionId }).del()

            existsOrError(rowsDeleted, 'Question not found')

            res.status(204).send()
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    const limit = 5

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('questions').count('id').first()
        const count = parseInt(result.count)

        app.db('questions')
            .select('id', 'title')
            .limit(limit).offset(page * limit - limit)
            .then(questions => res.json({ data: questions, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        try {
            const question = await app.db('questions')
                .select('id', 'title', 'text')
                .where({ id: req.params.id })
                .first()

            const answers = await app.db('question_answers')
                .select('questionId', 'option', 'title', 'correct')
                .where({ questionId: question.id })

            question.text = (question.text || '').toString()
            question.answers = answers

            res.json(question)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    return { save, remove, get, getById }
}
