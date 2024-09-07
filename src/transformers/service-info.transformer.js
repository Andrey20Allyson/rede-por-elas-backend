const { ServiceAddress } = require("../domains/service-address");
const { ServiceInfoFilters, ServiceInfo, CreateServiceInfoDTO, GetServiceInfoDTO } = require("../domains/service-info");
const { ServiceAddressTransformer } = require("./service-address.transformer");

class ServiceInfoTransformer {
  static INSTANCE = new ServiceInfoTransformer();

  addressTransformer = ServiceAddressTransformer.INSTANCE;

  /**
   * 
   * @param {CreateServiceInfoDTO} dto 
   */
  creationDTOToEntity(dto) {
    const entity = new ServiceInfo();

    entity.name = dto.name;
    entity.category.id = dto.category_id;
    entity.description = dto.description;
    entity.href = dto.href;
    entity.phone = dto.phone;
    
    if (dto.address != null) {
      entity.address = this.addressTransformer.creationDTOTOEntity(dto.address);
    }

    return entity
  }

  /**
   * 
   * @param {import("express").Request} req 
   */
  reqToFilters(req) {
    const filters = new ServiceInfoFilters();

    filters.category_id = req.params.category_id ?? req.query.category_id ?? null;

    return filters;
  }

  rowToEntity(row) {
    const entity = new ServiceInfo();

    entity.id = row.service_info_id;
    entity.name = row.name;
    entity.description = row.description;
    entity.href = row.href;
    entity.phone = row.phone;

    if (row.category_id != null) {
      entity.category.id = row.category_id;
      entity.category.name = row.category_name;
    }
    
    if (row.address_id != null) {
      const address = new ServiceAddress();

      address.id = row.address_id;
      address.city = row.address_city
      address.complement = row.address_complement
      address.neighborhood = row.address_neighborhood
      address.number = row.address_number
      address.street = row.address_street
    
      entity.address = address;
    }

    return entity;
  }

  /**
   * 
   * @param {ServiceInfo} entity 
   */
  entityToDTO(entity) {
    const dto = new GetServiceInfoDTO();

    dto.id = entity.id;
    dto.category

    return dto;
  }
}

module.exports = { ServiceInfoTransformer };