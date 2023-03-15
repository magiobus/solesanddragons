const replicateApiKey = process.env.REPLICATE_API_KEY;
import axios from "axios";

const trainer_version =
  "328bd9692d29d6781034e3acab8cf3fcb122161e6f5afb896a4ca9fd57090577"; //stable diffusion v1.5

const replicateLib = {
  generateImage: async (prompt, negativePrompt, webhook) => {
    if (!prompt || !negativePrompt || !webhook)
      throw new Error("Missing parameters");

    try {
      const data = {
        version: trainer_version,
        input: {
          prompt,
          negative_prompt: negativePrompt,
          image_dimensions: "512x512",
          num_outputs: 1,
          guidance_scale: 10,
          num_inference_steps: 50,
          scheduler: "K_EULER",
        },
        webhook_completed: webhook,
      };

      const response = axios.post(
        "https://api.replicate.com/v1/predictions",
        data,
        {
          headers: {
            Authorization: `Token ${replicateApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      console.error("error =>", error);
      return null;
    }
  },
};

export default replicateLib;
