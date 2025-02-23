import { Router } from "express";
import express from "express";
import multer from "multer";
import { PredictController } from "../controllers/predict/predict-controller";

const predict_routers = Router();
const predictController = new PredictController();

predict_routers.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /bot/predict:
 *   post:
 *     tags: [Prediction]
 *     summary: Predict
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Prediction successful
 */
predict_routers.post(
  "/bot/predict",
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded", error: "400" });
    }

    // Truyền buffer thay vì base64 string
    await predictController.predict(req.file.buffer, res);
  }
);

export default predict_routers;
