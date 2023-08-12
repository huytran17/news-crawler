import mongoose from "mongoose";

export default async function makeDb() {
  try {
    const connection_string = makeConnectionString();
    await mongoose.connect(connection_string);
  } catch (error) {
    console.error(error);
  }
}

function makeConnectionString() {
  const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;

  return `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
}
