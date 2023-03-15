import metaplexlib from "@/lib/metaplexlib";

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

    console.info("Replicate wbehook trigerred");
    try {
      res.status(200).json({ message: "replicate webhook answered" });
    } catch (error) {
      console.error("replicate wbehook error =>", error);
      res.status(500).json({ message: "probably didnt get statsString" });
    }
    //CREATE NFT HERE AND SEND TO WALLET
    console.log("answered to replicate, creating nft...");
    const nftcreated = await metaplexlib.createNFT(nftData);
    //answer to replicate webhook
    console.info("NFT created, answering webhook, ", nftcreated);
    return;
  } else {
    console.info("replicate webhook is not completed event");
    res
      .status(200)
      .json({ message: "replicate webhook is not completed event" });
  }
}
