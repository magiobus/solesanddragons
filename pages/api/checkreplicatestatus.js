import nc from "next-connect";
import ncoptions from "@/config/ncoptions";
import replicateLib from "@/lib/replicateLib";

const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //connects to database
  next();
});

handler.post(async (req, res) => {
  const { jobId } = req.body;
  const response = await replicateLib.getJobStatus(jobId);
  console.log("data response", response);
  res.status(200).json(response);
});
export default handler;
