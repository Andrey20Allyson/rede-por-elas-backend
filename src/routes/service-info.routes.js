const { Router } = require("express");
const { ServiceInfoResource } = require("../resources/service-info.resource");

class ServiceInfoRoutes {
  static INSTANCE = new ServiceInfoRoutes();

  BASE_PATH = '/service';
  router = Router();
  resource;

  constructor(resource = ServiceInfoResource.INSTANCE) {
    this.resource = resource;

    this.router.get('/')
  }
}

module.exports = { ServiceInfoRoutes };