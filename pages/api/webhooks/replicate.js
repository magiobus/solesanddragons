import nc from "next-connect";
import ncoptions from "@/config/ncoptions";

import metaplexlib from "@/lib/metaplexlib";

const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //connects to database
  console.log("replicate webhook");
  next();
});

handler.post(async (req, res) => {
  const { webhook, webhook_events_filter, output } = req.body;

  if (!webhook || !webhook_events_filter || !output) {
    return res.status(400).json({ message: "Bad request" });
  }

  //webhook_events_filter is an array of strings, need to check if it contains "completed"
  if (webhook_events_filter.includes("completed")) {
    //get params from webhook
    const params = new URLSearchParams(webhook.split("?")[1]);
    const newData = JSON.parse(params.get("data"));

    const nftData = {
      output,
      stats: newData?.stats,
      publicKey: newData?.publicKey,
      explorerLink: newData?.explorerLink,
    };

    //answer to replicate webhook becauyse if they not have a repsonse they are gonna try every 5 seconds.
    //and start creating nft after 5 seconds.
    res.status(200).json({ message: "replicate webhook is completed event" });
    console.log("replicate webhook is completed event");
    metaplexlib.createNFT(nftData);
  } else {
    console.info("replicate webhook is not completed event");
    res
      .status(200)
      .json({ message: "replicate webhook is not completed event" });
  }
});
export default handler;
