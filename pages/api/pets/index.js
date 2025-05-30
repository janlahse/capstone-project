import dbConnect from "@/db/connect";
import Pet from "@/db/models/Pet";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const pets = await Pet.find();
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pets", error });
    }
    return;
  }

  res.status(405).json({ message: "Method not allowed" });
}
