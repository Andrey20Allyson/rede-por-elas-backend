require('dotenv').config();

const e = require('express');
const cors = require('cors');
const rootRouter = require('./src/routes');

const PORT = process.env.PORT ?? 4040;

const app = e();

app.use(cors());
app.use(e.json());

app.use(rootRouter);

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});