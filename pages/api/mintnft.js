import nc from "next-connect";
import ncoptions from "@/config/ncoptions";
import metaplexlib from "@/lib/metaplexlib";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //connects to database
  console.log("mint nfts route");
  next();
});

handler.post(async (req, res) => {
  const { data } = req.body;
  const { webhook, webhook_events_filter, output } = data;

  if (!webhook || !webhook_events_filter || !output) {
    return res.status(400).json({ message: "Bad request mint nft" });
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
    console.log("mint nfts before create nft");
    await metaplexlib.createNFT(nftData);
    res.status(200).json({ message: "mint nfts before create nft, after" });
  } else {
    console.info("replicate webhook is not completed event");
    res
      .status(200)
      .json({ message: "replicate webhook is not completed event" });
  }
});
export default handler;
