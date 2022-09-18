import Answer from "./answer";

export default class Question {
    public id!: number;
    public title!: string;
    public text?: string;

    private _isCorrect!: boolean;
    private _answers: Answer[] = [];

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.id = data.id || 0;
        this.title = data.title || '';
        this.text = data.text || '';

        this._isCorrect = false;

        this._answers = (data.answers || []).map((a: any) => new Answer(a));

        if (this._answers.length === 0)
            this._answers = [ new Answer({ correct: true })];
    }

    public get isCorrect(): boolean {
        return this._isCorrect;
    }

    public get correctOption(): number {
        const answer = this._answers.filter(r => r.correct === true)[0] || {};
        return answer.option || 0;
    }

    public set correctOption(value: number) {
        this._answers = this._answers.map(answer => new Answer({
            ...answer,
            correct: answer.option == value
        }));
    }

    public get answers(): Answer[] {
        return this._answers;
    }

    public selectAnswer(option: number): void {
        if (!this.hasAnswerSelected()) {
            this._answers = this._answers.map(answer => {
                const selected = answer.option === option;

                const show = selected || answer.correct;
                if (show) answer.show();

                if (selected && answer.correct)
                    this._isCorrect = true;

                return answer;
            })
        }
    }

    public hasAnswerSelected(): boolean {
        const selectedAnswers = this._answers.filter(a => a.showed == true) || [];
        return selectedAnswers.length > 0;
    }

    public addAnswer(): void {
        const options = this._answers.map(r => r.option);
        const option = options.reduce((a, b) => Math.max(a, b)) + 1;

        this._answers.push(new Answer({ questaoId: this.id, option }));
    }

    public removeAnswer(option: number): void {
        if (this._answers.length > 1)
            this._answers = this._answers.filter(r => r.option !== option);
    }
}
