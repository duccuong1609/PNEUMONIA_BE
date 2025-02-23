import * as tf from "@tensorflow/tfjs";
import sharp from "sharp";

// 🔹 Model URL từ Vercel Blob Storage
var model_url = `${process.env.BE_URL}/tfjs_model/model.json`;
if (process.env.BE_URL != "http://localhost:8080") {
  model_url = `${process.env.BE_URL}/public/tfjs_model/model.json`;
}

export class PredictService {
  private model: tf.GraphModel | null = null;

  constructor() {
    // Load model khi khởi tạo đối tượng PredictService
    this.loadModel();
  }

  private async loadModel() {
    if (this.model) return; // Tránh tải lại mô hình nếu đã tải trước đó
    try {
      this.model = await tf.loadGraphModel(model_url);
      console.log("✅ Model loaded successfully");
    } catch (error) {
      console.error("❌ Model load error:", error);
    }
  }

  async predict(imageBuffer: Buffer) {
    try {
      if (!this.model) {
        throw new Error("Model not loaded yet!");
      }

      // 🔹 Convert the imageBuffer to raw pixel data using sharp
      const { data, info } = await sharp(imageBuffer)
        .resize(150, 150) // Resize the image to 150x150
        .raw() // Get the raw pixel data
        .toBuffer({ resolveWithObject: true });

      // 🔹 Convert raw pixel data to a tensor
      const imageTensor = tf
        .tensor3d(data, [150, 150, 3], "int32") // Đảm bảo kích thước tensor đúng
        .toFloat() // Chuyển đổi tensor thành kiểu float
        .div(tf.scalar(255)) // Chuẩn hóa pixel từ [0, 255] về [0, 1]
        .expandDims(0); // Thêm chiều batch

      // 🔹 Make prediction with the model
      const prediction = this.model.predict(imageTensor) as tf.Tensor;
      const dataPrediction = await prediction.data();

      return {
        predict: dataPrediction,
      };
    } catch (error) {
      console.error("❌ Prediction error:", error);
      throw error;
    }
  }
}