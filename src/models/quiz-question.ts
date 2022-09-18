import Question from "./question";

export default class QuizQuestion extends Question {
    public selected?: boolean = false;

    constructor(data: any = {}) {
        super(data);
    }
}
