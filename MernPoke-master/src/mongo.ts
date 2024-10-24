import { MongoClient } from "mongodb";

const connectToDB = async (uri: string) => {
  let client: null | MongoClient = null;
  try {
    client = new MongoClient(uri);
    await client.connect();
    return client;
  } catch (error) {
    console.log("Opps", error)
  }
}
export default connectToDB;