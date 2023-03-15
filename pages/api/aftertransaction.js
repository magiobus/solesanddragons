// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import chatgptlib from "@/lib/chatgptlib";
import replicateLib from "@/lib/replicateLib";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function handler(req, res) {
  //if is not post
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    name,
    race,
    gender,
    _class,
    imageGenerator = "replicate",
    publicKey,
    explorerLink,
  } = req.body;
  //Stats generation with chatgpt api
  const messages = [
    {
      role: "system",
      content:
        " You are a system that generates valid JSON objects as stats for a D&D v5 characters. You only return a Valid JSON Object as a response. You can use the following template to generate the JSON object. ```json {} ``` ",
    },

    {
      role: "user",
      content: `Generate a valid JSON object for a dnd v5 character. The name of the character is ${name}, and is a ${gender} ${race} ${_class}, it should have abilityScores, skills, equipment, features, background, personalityTraits, ideals, bonds and flaws. Remember that if the class is paladin or cleric the character should have a deity and you should only return the JSON Object as a response`,
    },
  ];

  try {
    console.info("generating chatgpt stats....");
    const statsObject = await chatgptlib.get(messages, "json");
    console.info("chatgpt stats DONE");

    // // //Image Generation Here....
    if (
      imageGenerator === "replicate" &&
      statsObject &&
      typeof statsObject === "object"
    ) {
      console.info("generating Stable Difussion image....");
      const prompt = `face portrait of ${_class} ${gender} ${race}, dnd character illustration, 4k. `;
      const negativePrompt = `${
        gender === "female" ? "male" : "female"
      },duplicate,blackandwhite`;

      const params = new URLSearchParams();
      const tempobject = {
        stats: statsObject,
        publicKey,
        explorerLink,
      };

      params.append("data", JSON.stringify(tempobject));
      const webhook = `${baseUrl}/api/webhooks/replicate?${params.toString()}`;

      console.log("webhook URL =>", webhook);

      const replicateResponse = await replicateLib.generateImage(
        prompt,
        negativePrompt,
        webhook
      );
      console.info(
        "Stable Difussion JOB Sent, wiating for webhook....",
        replicateResponse
      );

      res.status(200).json({ message: "Chatgpt + replicate webhook done" });
    } else {
      console.error("error =>", "probably didnt get statsObject", statsObject);
      res.status(500).json({ message: "Somethhing went wrong" });
    }
  } catch (error) {
    console.error("error =>", error);
    res.status(500).json({ message: "probably didnt get statsString" });
  }
}
