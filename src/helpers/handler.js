const { serverError } = require("./responses");

function handleResource(resource, method, paramsReducer = () => []) {
  return async (req, res) => {
    let out;
    
    try {
      out = await resource[method](...paramsReducer(req));
    } catch (err) {
      console.log(err);
      out = serverError();
    }
  
    res.status(out.status).send(out.body);
  }
}

module.exports = { handleResource };