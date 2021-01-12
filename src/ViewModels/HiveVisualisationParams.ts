export enum ViewResponse {
    All, Mine
}

export enum Layout {
    Random
}

export class HiveVisualisationParams {
    public viewResponse: ViewResponse = ViewResponse.All;
    public layout: Layout = Layout.Random;
}