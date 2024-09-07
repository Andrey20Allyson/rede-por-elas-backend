const { ServiceInfoFilters, CreateServiceInfoDTO } = require("../domains/service-info");
const { ok, created } = require("../helpers/responses");
const { ServiceAddressPgRepository } = require("../repositories/service-address.repository");
const { ServiceCategoryPgRepository } = require("../repositories/service-category.repository");
const { ServiceInfoPgRepository } = require("../repositories/service-info.repository");
const { ServiceInfoTransformer } = require("../transformers/service-info.transformer");

class ServiceInfoResource {
  static INSTANCE = new ServiceInfoResource();

  transformer = ServiceInfoTransformer.INSTANCE;

  serviceRepository;
  categoryRepository;
  addressRepository;

  constructor(
    serviceRepository = ServiceInfoPgRepository.INSTANCE,
    categoryRepository = ServiceCategoryPgRepository.INSTANCE,
    addressRepository = ServiceAddressPgRepository.INSTANCE,
  ) {
    this.serviceRepository = serviceRepository;
    this.categoryRepository = categoryRepository;
    this.addressRepository = addressRepository;
  }

  /**
   * 
   * @param {CreateServiceInfoDTO} serviceDTO 
   */
  async create(serviceDTO) {
    const serviceToCreate = this.transformer.creationDTOToEntity(serviceDTO);

    const createdService = await this.serviceRepository.create(serviceToCreate);
    const createdAddress = await this.addressRepository.create(serviceToCreate.address);

    createdService.address = createdAddress;

    const responseServiceDTO = this.transformer.entityToDTO(createdService);

    return created(responseServiceDTO);
  }

  /**
   * 
   * @param {ServiceInfoFilters} filters 
   */
  async list(filters) {
    const services = await this.serviceRepository.list(filters);

    const responseServiceDTOs = services.map(service => this.transformer.entityToDTO(service));

    return ok(responseServiceDTOs);
  }
}

module.exports = { ServiceInfoResource };