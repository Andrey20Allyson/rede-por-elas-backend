const { Client } = require('pg');
const dotenv = require('dotenv');
const e = require('express');

dotenv.config();

const PORT = process.env.PORT ?? 4040;

const app = e();

app.get('/', async (req, res) => {
  res.json({
    message: await getNow(),
  });
})

app.listen(PORT);

async function getNow() {
  const client = new Client(process.env.DATABASE_URL);

  await client.connect();

  const result = await client.query('SELECT NOW()');

  await client.end();

  return result.rows;
}