class ServiceAddress {
  /**@type {number} */
  id = 0;

  /**@type {string} */
  city = '';

  /**@type {string} */
  neighborhood = '';

  /**@type {string} */
  street = '';

  /**@type {number} */
  number = 0;

  /**@type {string} */
  complement = '';
}

class CreateServiceAddressDTO {
  /**@type {string} */
  city = '';

  /**@type {string} */
  neighborhood = '';

  /**@type {string} */
  street = '';

  /**@type {number} */
  number = 0;

  /**@type {string} */
  complement = '';
}

class GetServiceAddressDTO {
  /**@type {string} */
  city = '';

  /**@type {string} */
  neighborhood = '';

  /**@type {string} */
  street = '';

  /**@type {number} */
  number = 0;

  /**@type {string} */
  complement = '';
}

module.exports = { ServiceAddress, CreateServiceAddressDTO, GetServiceAddressDTO };