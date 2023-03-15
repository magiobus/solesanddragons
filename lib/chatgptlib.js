import axios from "axios";
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
const chatGptUrl = "https://api.openai.com/v1/chat/completions";
const model = "gpt-3.5-turbo";

const chatgptlib = {};

chatgptlib.get = async function (messages, type = "text") {
  if (!messages) throw new Error("messages is required");

  try {
    const params = {
      model,
      messages: messages,
      max_tokens: 800,
    };

    const { data: chatgptdata } = await axios.post(chatGptUrl, params, {
      headers: {
        Authorization: `Bearer ${OPEN_AI_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.info("chatgptdata =>", chatgptdata.choices[0].message.content);

    //find ```json and ``` and return the json
    let parsedObject = "";
    if (type === "json") {
      const textContent = chatgptdata.choices[0].message.content;

      const regex = /```json\n?([\s\S]*?)\n?```/;
      const match = textContent.match(regex);
      if (match) {
        console.log("si hay match", match);
        const jsonString = match[1];
        const jsonObject = JSON.parse(jsonString) || {};
        parsedObject = jsonObject;
      } else {
        console.log("no hay match");
        const regex = /```([\s\S]*)```/;
        const match = textContent.match(regex);
        const jsonString = match[1];
        const jsonObject = JSON.parse(jsonString);
        parsedObject = jsonObject;
      }
    }

    return parsedObject;
  } catch (error) {
    console.error("error =>", error);
    throw new Error(error);
  }
};

export default chatgptlib;
