import mongoose from "mongoose";

export default async function makeDb() {
  const connection_string = makeConnectionString();

  const is_not_connected = mongoose.connection.readyState === 0;
  if (is_not_connected) {
    await mongoose.connect(connection_string);
    console.log("Successfully connected to DB");
  }
}

function makeConnectionString() {
  const { MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, MONGO_ROOT_DATABASE } =
    process.env;

  return `mongodb+srv://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${MONGO_ROOT_DATABASE}.53encrg.mongodb.net/?retryWrites=true&w=majority`;
}
