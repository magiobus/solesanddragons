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
    console.info("chatgpt stats DONE...");

    const datatoReturn = {
      stats: statsObject,
      publicKey,
      explorerLink,
      imageGenerator,
    };

    res.status(200).json(datatoReturn);
  } catch (error) {
    console.error("error =>", error);
    res.status(500).json({ message: "probably didnt get statsString" });
  }
}
