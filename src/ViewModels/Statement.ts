class StatementData {
    public id: string = '';
    public label: string = '';
    public myResponse: number = 0;
    public commonResponse: number = 0;
    public penetration: number = 0;
}

export class Statement {
    public data: StatementData = new StatementData();
    public color: string = 'white';
    public position: { x: number, y: number } = {x: 0, y: 0};
}