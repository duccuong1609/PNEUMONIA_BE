export class LastClaimDTO {

    constructor(
        amount: number,
        lastClaimTime?: Date
    ) {
        this.amount = amount;
        this.lastClaimTime = lastClaimTime;
    }
    amount!: number
    lastClaimTime?: Date
}