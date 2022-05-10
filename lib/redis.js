import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class Topic extends Entity {}

let schema = new Schema(
  Topic,
  {
    topicType: { type: "string" },
    topicName: { type: "text", textSearch: true },
    topicDescription: { type: "text", textSearch: true },
  },
  {
    dataStructure: "JSON",
  }
);

export async function addTopic(data) {
  await connect();

  // const repository = new Repository(schema, client);
  const repository = client.fetchRepository(schema);

  const topic = repository.createEntity(data);

  const id = await repository.save(topic);
  return id;
}

export async function createIndex() {
  await connect();

  const repository = client.fetchRepository(schema);
  await repository.createIndex();
}

export async function searchTopics(q) {
  await connect();

  const repository = client.fetchRepository(schema);

  const topics = await repository
    .search()
    .where("topicType")
    .eq(q)
    .or("topicName")
    .matches(q)
    .or("topicDescription")
    .matches(q)
    .return.all();

  return topics;
}
