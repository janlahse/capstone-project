import dbConnect from "@/db/connect";
import Pet from "@/db/models/Pet";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const pet = await Pet.findById(id);
      if (!pet) {
        return res.status(404).json({ message: "Pet nicht gefunden" });
      }
      return res.status(200).json(pet);
    } catch (error) {
      return res.status(500).json({ message: "Fehler beim Laden des Pets", error });
    }
  }

  res.status(405).json({ message: "Methode nicht erlaubt" });
}
