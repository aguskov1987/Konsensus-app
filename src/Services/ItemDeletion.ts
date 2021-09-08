export enum ItemDeletionStatus {
    Success,
    RespondedTo,
    ConnectedTo,
    Missing,
    Irrelevant
}

export class ItemDeletionResult {
    status: ItemDeletionStatus = ItemDeletionStatus.Irrelevant;
}
