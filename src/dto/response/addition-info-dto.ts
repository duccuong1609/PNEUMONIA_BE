export class AddtionInfoDTO {

    constructor(
        speed: number,
        level: number,
        road: number,
    ) {
        this.speed = speed;
        this.level = level;
        this.road = road;
    }

    
    speed!: number
    level!: number
    road!: number
    
}