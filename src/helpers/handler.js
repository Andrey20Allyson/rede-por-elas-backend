const { serverError } = require("./responses");

async function handleResource(resource, method, res, ...params) {
  let out;
  
  try {
    out = await resource[method](...params);
  } catch (err) {
    out = serverError();
  }

  res.status(out.status).send(out.body);
}

module.exports = { handleResource };