export interface BoostSpeedDto {
    phone: string;
    level: number;
    speed: number;
    road?: number;
  }
  
  export class BoostSpeedCalculator {
    /**
     * Calculate Nir Capacity based on level, speed, and road
     * @param level User's current level
     * @param speed User's current speed
     * @param road User's road value
     * @returns Calculated Nir Capacity
     */
    static calculateNirCapacity(
      level: number, 
      speed: number, 
      road: number = 0
    ): number {
      // Example calculation - adjust based on your specific game logic
      return Math.floor(
        (level * speed) + 
        (road * 0.5) + 
        (level * 0.3)
      );
    }
  
    /**
     * Validate boost speed input
     * @param dto Boost speed data transfer object
     * @returns Validation result
     */
    static validateInput(dto: BoostSpeedDto): boolean {
      return !!(
        dto.phone && 
        dto.level && 
        dto.speed && 
        dto.level > 0 && 
        dto.speed > 0
      );
    }
  }