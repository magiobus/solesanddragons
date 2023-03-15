import nc from "next-connect";
import ncoptions from "@/config/ncoptions";
import metaplexlib from "@/lib/metaplexlib";
import { findCandyMachinesV2ByPublicKeyFieldOperation } from "@metaplex-foundation/js";

const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //connects to database
  console.log("mint nfts route");
  next();
});

handler.post(async (req, res) => {
  console.log("req.body =>", req.body);
  const { stats, explorerLink, photo, publicKey } = req.body;

  if ((!stats || !explorerLink || !photo, !publicKey)) {
    return res.status(400).json({ message: "Bad request mint nft" });
  }

  //webhook_events_filter is an array of strings, need to check if it contains "completed"
  //get params from webhook

  const nftData = {
    output: photo,
    stats,
    publicKey,
    explorerLink,
  };

  //answer to replicate webhook becauyse if they not have a repsonse they are gonna try every 5 seconds.
  //and start creating nft after 5 seconds.
  console.log("mint nfts before create nft");
  try {
    await metaplexlib.createNFT(nftData);
    res.status(200).json({ message: "mint nfts before create nft, after" });
  } catch (error) {
    console.error("error =>", error);
    res.status(500).json({ message: "probably didnt get statsString" });
  }
});
export default handler;
