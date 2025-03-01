import * as tf from "@tensorflow/tfjs";
import sharp from "sharp";

var model_url = `${process.env.BE_URL}/tfjs_model/model.json`;
if (process.env.BE_URL !== "http://localhost:8080") {
  model_url = `${process.env.BE_URL}/public/tfjs_model/model.json`;
}

const modelCache: Map<string, Promise<tf.GraphModel>> = new Map();

export class PredictService {
  private model: tf.GraphModel | null = null;

  constructor() {
    this.loadModel();
  }

  private async loadModel() {
    if (!modelCache.has(model_url)) {
      console.log("⏳ Loading model...");
      modelCache.set(
        model_url,
        tf.loadGraphModel(model_url).then((model) => {
          console.log("✅ Model loaded successfully");
          return model;
        })
      );
    }
    this.model = await modelCache.get(model_url)!;
  }

  async predict(imageBuffer: Buffer) {
    try {
      if (!this.model) {
        throw new Error("Model not loaded yet!");
      }

      const { data } = await sharp(imageBuffer)
        .resize(150, 150)
        .removeAlpha()
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
    } catch (error) {
      console.error("❌ Prediction error:", error);
      throw error;
    }
  }
}

async function preloadModel() {
  if (!modelCache.has(model_url)) {
    console.log("⏳ Preloading model...");
    modelCache.set(
      model_url,
      tf.loadGraphModel(model_url).then((model) => {
        console.log("✅ Model preloaded successfully");
        return model;
      })
    );
  }
}

preloadModel();
