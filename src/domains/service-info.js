const { ServiceAddress, CreateServiceAddressDTO, GetServiceAddressDTO } = require("./service-address");
const { ServiceCategory, GetServiceCategoryDTO } = require("./service-category");

class ServiceInfo {
  /**@type {number} */
  id = 0;

  /**@type {string} */
  name = '';

  /**@type {string | null} */
  description = null;

  /**@type {ServiceCategory} */
  category = new ServiceCategory();

  /**@type {ServiceAddress | null} */
  address = null;

  /**@type {string | null} */
  href = null;

  /**@type {string | null} */
  phone = null;
}

class CreateServiceInfoDTO {
  /**@type {string} */
  name = '';

  /**@type {string | null} */
  description = null;

  /**@type {number} */
  category_id = 0;

  /**@type {CreateServiceAddressDTO | null} */
  address = null;

  /**@type {string | null} */
  href = null;

  /**@type {string | null} */
  phone = null;
}

class GetServiceInfoDTO {
  /**@type {number} */
  id = 0;

  /**@type {string} */
  name = '';

  /**@type {string | null} */
  description = null;

  /**@type {GetServiceCategoryDTO} */
  category = new GetServiceCategoryDTO();

  /**@type {GetServiceAddressDTO | null} */
  address = null;

  /**@type {string | null} */
  href = null;

  /**@type {string | null} */
  phone = null;
}

class ServiceInfoFilters {
  /**@type {string | null} */
  category_id = null;
}

module.exports = {
  ServiceInfo,
  CreateServiceInfoDTO,
  GetServiceInfoDTO,
  ServiceInfoFilters,
};