export class UserDTO {

    constructor(
        id: number,
        phone: string,
        privateKey: string,
        speed: number,
        level: number,
        road: number,
        referralCode: number,
        amount: number,
        userWallet: string,
        lastClaimTime?: Date
    ) {
        this.id = id;
        this.phone = phone;
        this.privateKey = privateKey;
        this.speed = speed;
        this.level = level;
        this.road = road;
        this.referralCode = referralCode;
        this.amount = amount;
        this.userWallet = userWallet;
        this.lastClaimTime = lastClaimTime;
    }

    id!: number
    phone!: string  // telegramID
    privateKey!: string
    speed!: number
    level!: number
    road!: number
    referralCode!: number
    amount!: number
    userWallet!: string
    lastClaimTime?: Date
}