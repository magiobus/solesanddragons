// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import chatgptlib from "@/lib/chatgptlib";
import replicateLib from "@/lib/replicateLib";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://e510-186-96-37-57.ngrok.io";

export default async function handler(req, res) {
  //if is not post
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, race, gender, _class, imageGenerator = "replicate" } = req.body;
  //Stats generation with chatgpt api
  const messages = [
    {
      role: "assistant",
      content:
        "You are a system that generates valid JSON objects as stats for a D&D v5 characters.",
    },
    {
      role: "user",
      content: `Generate a valid JSON object for a dnd v5 character. The name of the character is ${name}, and is a ${gender} ${race} ${_class}, it should have abilityScores, skills, equipment, features, background, personalityTraits, ideals, bonds and flaws. Remember that if the class is paladin or cleric the character should have a deity and you should only return the JSON Object as a response`,
    },
  ];

  try {
    console.info("generating chatgpt stats");
    const statsString = await chatgptlib.get(messages, "json");

    console.log("statsString =>", statsString);

    // //Image Generation Here....
    if (imageGenerator === "replicate" && statsString) {
      const prompt = `face portrait of ${_class} ${gender} ${race}, dnd character illustration, 4k. `;
      const negativePrompt = `${
        gender === "female" ? "male" : "female"
      },duplicate,blackandwhite`;

      const stats = JSON.parse(statsString);
      const params = new URLSearchParams();
      params.append("data", JSON.stringify(stats));
      const webhook = `${baseUrl}/api/webhooks/replicate?${params.toString()}`;

      await replicateLib.generateImage(prompt, negativePrompt, webhook);
      res.status(200).json({ message: "Chatgpt + replicate webhook done" });
    } else {
      res.status(500).json({ message: "Somethhing went wrong" });
    }
  } catch (error) {
    console.error("error =>", error);
    res.status(500).json({ message: "probably didnt get statsString" });
  }
}
