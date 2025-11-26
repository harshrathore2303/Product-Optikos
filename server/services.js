import { configDotenv } from "dotenv";
configDotenv();

import axios from "axios";
import FormData from "form-data";

export async function removeBgAxios(file) {
  const form = new FormData();
  form.append("size", "auto");
  form.append("image_file", file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
    knownLength: file.size,
  });

  const response = await axios.post(
    "https://api.remove.bg/v1.0/removebg",
    form,
    {
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_API_KEY,
        ...form.getHeaders(),
      },
      responseType: "arraybuffer",
    }
  );

  return response.data;
}
