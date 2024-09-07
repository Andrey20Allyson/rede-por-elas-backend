const { ServiceAddress, CreateServiceAddressDTO, GetServiceAddressDTO } = require("../domains/service-address");

class ServiceAddressTransformer {
  static INSTANCE = new ServiceAddressTransformer();

  /**
   * 
   * @param {CreateServiceAddressDTO} dto 
   * @returns 
   */
  creationDTOTOEntity(dto) {
    const address = new ServiceAddress();

    address.city = dto.city;
    address.neighborhood = dto.neighborhood;
    address.street = dto.street;
    address.number = dto.number;
    address.complement = dto.complement;

    return address;
  }

  rowToEntity(row) {
    const entity = new ServiceAddress();

    entity.id = row.service_address_id;
    entity.city = row.city;
    entity.neighborhood = row.neighborhood;
    entity.street = row.street;
    entity.number = row.number;
    entity.complement = row.complement;

    return entity;
  }

  /**
   * 
   * @param {ServiceAddress} entity 
   */
  entityToDTO(entity) {
    const dto = new GetServiceAddressDTO();

    return dto;
  }
}

module.exports = { ServiceAddressTransformer };