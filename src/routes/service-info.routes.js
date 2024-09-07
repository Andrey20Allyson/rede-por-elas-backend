const { Router } = require("express");
const { ServiceInfoResource } = require("../resources/service-info.resource");
const { handleResource } = require("../helpers/handler");
const { ServiceInfoTransformer } = require("../transformers/service-info.transformer");

class ServiceInfoRoutes {
  static INSTANCE = new ServiceInfoRoutes();

  BASE_PATH = '/service';
  transformer = ServiceInfoTransformer.INSTANCE;
  router = Router();
  resource;

  constructor(resource = ServiceInfoResource.INSTANCE) {
    this.resource = resource;

    this.router.get('/', handleResource(
      this.resource,
      'list',
      req => [
        this.transformer.reqToFilters(req),
      ],
    ));

    this.router.post('/', handleResource(this.resource, 'create', req => [req.body]))
  }
}

module.exports = { ServiceInfoRoutes };