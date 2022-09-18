export default class Answer {
    public questionId!: number;
    public option!: number;
    public title!: string;
    public correct!: boolean;
    public showed!: boolean;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.questionId = data.questionId || 0;
        this.option = data.option || 1;
        this.title = data.title || '';
        this.correct = data.correct || false;
        this.showed = false;
    }

    public show(): void {
        this.showed = true;
    }
}
