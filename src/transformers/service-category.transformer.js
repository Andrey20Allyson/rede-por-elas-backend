const { GetServiceCategoryDTO, ServiceCategory, CreateServiceCategoryDTO } = require("../domains/service-category");

class ServiceCategoryTransformer {
  static INSTANCE = new ServiceCategoryTransformer();

  rowToEntity(row) {
    const entity = new ServiceCategory();

    entity.id = row.service_category_id;
    entity.name = row.name;

    return entity;
  }

  /**
   * 
   * @param {ServiceCategory} entity 
   * @returns 
   */
  entityToDTO(entity) {
    const dto = new GetServiceCategoryDTO();

    dto.name = entity.name;
    dto.id = entity.id;

    return dto;
  }

  /**
   * 
   * @param {CreateServiceCategoryDTO} dto 
   * @returns 
   */
  creationDTOToEntity(dto) {
    const entity = new ServiceCategory();

    entity.name = dto.name;

    return entity;
  }
}

module.exports = { ServiceCategoryTransformer };