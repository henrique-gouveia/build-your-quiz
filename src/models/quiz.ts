export default class Quiz {
    public id!: string;
    public count!: number;

    constructor(data: any = {}) {
        if (!data) {
            data = {}
        }

        this.id = data.id || '';
        this.count = data.count || 10;
    }
}
