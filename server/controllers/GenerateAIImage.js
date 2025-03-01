import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "url",
        });
        const generateImage = response.data.data[0].url; 
        return res.status(200).json({ photo: generateImage });
    } catch (error) {
        next(
            createError(
                error.status,
                error?.response?.data?.error?.message || error.message
            )
        )
    }
}

export default generateImage;