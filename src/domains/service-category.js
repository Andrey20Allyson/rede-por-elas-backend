class ServiceCategory {
  /**@type {number} */
  id = 0;

  /**@type {string} */
  name = '';
}

class GetServiceCategoryDTO {
  /**@type {number} */
  id = 0;

  /**@type {string} */
  name = '';
}

class CreateServiceCategoryDTO {
  /**@type {string} */
  name = '';
}

module.exports = { ServiceCategory, GetServiceCategoryDTO, CreateServiceCategoryDTO };