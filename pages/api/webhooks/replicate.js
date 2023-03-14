import nftdataexample from "@/data/nftdataexample";

//replicate webhook
export default async function handler(req, res) {
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

    console.info("replicate webhook is completed event =>", nftData);

    //CREATE NFT HERE AND SEND TO WALLET
    // await metaplexlib.createNFT(nftData);

    res.status(200).json({ message: "replicate webhook is completed event" });
  } else {
    console.info("replicate webhook is not completed event");
    return;
  }
}
