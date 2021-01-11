export class SynapseData {
    public id: string = '';
    public label: string = '';
    public source: string = '';
    public target: string = '';
    public myResponse: number = 0;
    public commonResponse: number = 0;
    public penetration: number = 0;
}

export class SynapseVm {
    public data: SynapseData = new SynapseData();
    public color: string = 'black';
}