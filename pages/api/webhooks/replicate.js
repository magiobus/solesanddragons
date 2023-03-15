import nc from "next-connect";
import ncoptions from "@/config/ncoptions";
import metaplexlib from "@/lib/metaplexlib";
const axios = require("axios");
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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

  axios.post(`${BASEURL}/api/mintnft`, {
    data: req.body,
  });

  res.status(200).json({ message: "replicate webhook is completed event" });
  console.log("replicate webhook is completed event");
});
export default handler;
