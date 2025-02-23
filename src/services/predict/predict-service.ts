import * as tf from "@tensorflow/tfjs";
import sharp from 'sharp';

// 🔹 Model URL từ Vercel Blob Storage
const MODEL_URL = "http://localhost:8080/tfjs_model/model.json";

export class PredictService {
  private model: tf.GraphModel | null = null;

  constructor() {
    this.loadModel();
  }

  private async loadModel() {
    try {
      this.model = await tf.loadGraphModel(MODEL_URL);
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
        .tensor3d(data, [info.height, info.width, 3], "int32")
        .toFloat() // Convert to float tensor
        .div(tf.scalar(255)) // Normalize to [0, 1]
        .expandDims(0); // Add batch dimension (equivalent to np.expand_dims)
  
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
