import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { removeBgAxios } from "./services.js";
dotenv.config();
import ServerlessHttp from "serverless-http";

const app = express();
const PORT = process.env.PORT || 8000;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.post("/generate", upload.single("image_file"), async (req, res) => {
  try {
    const file = req.file;
    const resultImage = await removeBgAxios(file);

    const base64Image = Buffer.from(resultImage).toString("base64");
    res.json({
      image: `data:image/png;base64,${base64Image}`,
    });
  } catch (error) {
    res.status(500).json({ error: "remove.bg API request failed" });
  }
});

export const handler = ServerlessHttp(app);
