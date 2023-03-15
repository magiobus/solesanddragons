// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import chatgptlib from "@/lib/chatgptlib";
import replicateLib from "@/lib/replicateLib";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function handler(req, res) {
  //if is not post
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // // //Image Generation Here....
    const { data, imageGenerator = "replicate" } = req.body;
    if (imageGenerator === "replicate" && data && typeof data === "object") {
      console.info("generating Stable Difussion image....");
      const { publicKey, explorerLink, stats } = data;
      const { class: _class, gender, race, name } = stats;
      const prompt = `face portrait of ${_class} ${gender} ${race}, dnd character illustration, 4k. `;
      const negativePrompt = `${
        gender === "female" ? "male" : "female"
      },duplicate,blackandwhite`;

      const params = new URLSearchParams();
      const tempobject = {
        stats: stats,
        publicKey: publicKey,
        explorerLink: explorerLink,
      };
      console.log("tempobject =>", tempobject);

      params.append("data", JSON.stringify(tempobject));
      const webhook = `${baseUrl}/api/webhooks/replicate?${params.toString()}`;

      console.log("webhook URL =>", webhook);

      const replicateResponse = await replicateLib.generateImage(
        prompt,
        negativePrompt,
        webhook
      );

      console.info(
        "Stable Difussion JOB Sent, wiating for webhook....",
        replicateResponse?.data
      );

      res.status(200).json({
        data: replicateResponse?.data,
      });
    } else {
      console.error("error =>", "probably didnt get data");
      res
        .status(500)
        .json({ message: "Somethhing went wrong sending job to replicate" });
    }
  } catch (error) {
    console.error("error =>", error);
    res.status(500).json({ message: "probably didnt get statsString" });
  }
}
