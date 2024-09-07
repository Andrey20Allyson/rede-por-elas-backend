const { Client } = require("pg");

const DATABASE_URL = process.env.DATABASE_URL;

async function pgConnect() {
  const client = new Client(DATABASE_URL);

  await client.connect();
  
  return client;
}

module.exports = { pgConnect };