// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import chatgptlib from "@/lib/chatgptlib";

export default async function handler(req, res) {
  //if is not post
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, race, gender, _class } = req.body;
  //Stats generation with chatgpt api
  const messages = [
    {
      role: "system",
      content:
        "You are a helpful system that takes name, class, gender and race to generate stats for a D&D v5 character in a JSON Object, you only return the JSON object.",
    },
    {
      role: "user",
      content: `Please generate a JSON object for my dnd v5 character. It's name is ${name}, and is a ${gender} ${race} ${_class}, it should have abilityScores, skills, equipment, features, background, personalityTraits, ideals, bonds and flaws. Remember that if the class is paladin or cleric the character should have a deity`,
    },
  ];

  try {
    const response = await chatgptlib.get(messages, "json");
    //Image Generation Here....
    res.status(200).json(response);
  } catch (error) {
    console.error("error =>", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
