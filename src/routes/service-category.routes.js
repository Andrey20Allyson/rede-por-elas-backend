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
    
    this.router.get('/', handleResource(this.resource, 'list'));

    this.router.post('/', handleResource(this.resource, 'create', req => [req.body]));

    this.router.use('/:category_id/', this.serviceInfoRoutes.router);
  }
}

module.exports = { ServiceCategoryRoutes };