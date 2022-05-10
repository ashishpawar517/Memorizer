import { searchTopics } from "../../lib/redis";

export default async function handler(req, res) {
  const q = req.query.q;
  const topics = await searchTopics(q);
  res.status(200).json({ topics });
}
