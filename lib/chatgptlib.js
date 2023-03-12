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
    };

    const { data: chatgptdata } = await axios.post(chatGptUrl, params, {
      headers: {
        Authorization: `Bearer ${OPEN_AI_KEY}`,
        "Content-Type": "application/json",
      },
    });

    //find ```json and ``` and return the json
    if (type === "json") {
      const choicesText = chatgptdata.choices[0].message.content;
      const jsonString = choicesText.match(/```([^`]*)```/)[1];
      const character = JSON.parse(jsonString);
      return character;
    }

    return chatgptdata;
  } catch (error) {
    console.error("error =>", error);
    throw new Error(error);
  }
};

export default chatgptlib;
