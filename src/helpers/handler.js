const { serverError } = require("./responses");

function handleResource(resource, method, paramsReducer = () => []) {
  return async (req, res) => {
    let out;
    
    try {
      out = await resource[method](...paramsReducer(req));
    } catch (err) {
      out = serverError();
    }
  
    res.status(out.status).send(out.body);
  }
}

module.exports = { handleResource };