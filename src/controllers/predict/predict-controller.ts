import { Request, Response } from "express";
import { PredictService } from "../../services/predict/predict-service";

export class PredictController {
  private predictService = new PredictService();

  async predict(imageBuffer: Buffer, res: Response) {
    try {
      const predict = await this.predictService.predict(imageBuffer);
      return res.status(200).json({
        message: "Predict successful",
        data: predict,
      });
    } catch (error) {
      console.error("❌ Predict error:", error);
      return res.status(500).json({
        message: "Predict failed",
      });
    }
  }
}
