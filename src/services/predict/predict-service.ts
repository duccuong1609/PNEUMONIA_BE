import * as tf from "@tensorflow/tfjs";
import sharp from "sharp";

var model_url = `${process.env.BE_URL}/tfjs_model/model.json`;
if (process.env.BE_URL !== "http://localhost:8080") {
  model_url = `${process.env.BE_URL}/public/tfjs_model/model.json`;
}

export class PredictService {
  private model: tf.GraphModel | null = null;
  private modelLoaded: Promise<void>;

  constructor() {
    this.modelLoaded = this.loadModel();
  }

  private async loadModel() {
    if (this.model) return;
    try {
      console.log("⏳ Loading model...");
      this.model = await tf.loadGraphModel(model_url);
      console.log("✅ Model loaded successfully");
    } catch (error) {
      console.error("❌ Model load error:", error);
    }
  }

  async predict(imageBuffer: Buffer) {
    await this.modelLoaded; // 🔥 Đảm bảo model được load trước khi predict

    if (!this.model) {
      throw new Error("Model not loaded yet!");
    }

    const { data } = await sharp(imageBuffer)
      .resize(150, 150)
      .removeAlpha() // 🔥 Loại bỏ kênh Alpha để chỉ còn RGB
      .raw()
      .toBuffer({ resolveWithObject: true });

    const imageTensor = tf
      .tensor3d(data, [150, 150, 3], "int32")
      .toFloat()
      .div(tf.scalar(255))
      .expandDims(0);

    const prediction = this.model.predict(imageTensor) as tf.Tensor;
    const dataPrediction = await prediction.data();

    return { predict: dataPrediction };
  }
}
