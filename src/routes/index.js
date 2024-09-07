const { Router } = require("express");
const { pgConnect } = require("../helpers/postgres");
const { ServiceCategoryRoutes } = require("./service-category.routes");

const rootRouter = Router();

rootRouter.get('/', async (res) => {
  res.json({
    message: await getNow(),
  });
});

rootRouter.use(
  ServiceCategoryRoutes.INSTANCE.BASE_PATH,
  ServiceCategoryRoutes.INSTANCE.router,
);

module.exports = rootRouter;

async function getNow() {
  const client = await pgConnect();

  const result = await client.query('SELECT NOW()');

  await client.end();

  return result.rows;
}