const { Router } = require("express");
const { ServiceCategoryResource } = require("../resources/service-category.resource");
const { handleResource } = require("../helpers/handler");
const { ServiceInfoRoutes } = require("./service-info.routes");

class ServiceCategoryRoutes {
  static INSTANCE = new ServiceCategoryRoutes();

  BASE_PATH = '/category';
  router = Router();
  resource;
  serviceInfoRoutes;

  constructor(
    resource = ServiceCategoryResource.INSTANCE,
    serviceInfoRoutes = ServiceInfoRoutes.INSTANCE,
  ) {
    this.resource = resource;
    this.serviceInfoRoutes = serviceInfoRoutes;
    
    this.router.get('/', (_, res) => handleResource(this.resource, 'list', res));

    this.router.post('/', (req, res) => handleResource(this.resource, 'create', res, req.body));

    this.router.use('/:category_id/', this.serviceInfoRoutes.router);
  }
}

module.exports = { ServiceCategoryRoutes };