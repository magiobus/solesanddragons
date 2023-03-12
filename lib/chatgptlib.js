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

    //find ```json and ``` and return the json
    if (type === "json") {
      const text = chatgptdata.choices[0].message.content;
      //text should be what is inside ``` and ```

      const regExp = /```([\s\S]*)```/;
      const matches = regExp.exec(text);
      let extractedText = "";
      if (matches) {
        extractedText = matches[1];
        //delete json word if it is there
        extractedText = extractedText.replace("json", "") || extractedText;
      }
      return extractedText;
    }

    return chatgptdata;
  } catch (error) {
    console.error("error =>", error);
    throw new Error(error);
  }
};

export default chatgptlib;
