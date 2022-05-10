import { addTopic } from "../../lib/redis";

export default async function handler(req, res) {
  const id = await addTopic(req.body);
  res.status(200).json({ id });
}
