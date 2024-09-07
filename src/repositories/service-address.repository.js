const { ServiceAddress } = require("../domains/service-address");
const { pgConnect } = require("../helpers/postgres");
const { ServiceAddressTransformer } = require("../transformers/service-address.transformer");

class ServiceAddressPgRepository {
  static INSTANCE = new ServiceAddressPgRepository();

  transformer = ServiceAddressTransformer.INSTANCE;

  /**
   * 
   * @param {ServiceAddress} address
   */
  async create(address) {
    const client = await pgConnect();

    const result = await client.query(`
      INSERT INTO service_address (city, neigthborhood, street, number, complement)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [address.city, address.neighborhood, address.street, address.number, address.complement],
    );

    await client.end();
    
    const categoryResult = await client.query(``)

    const row = result.rows[0];

    return this.transformer.rowToEntity(row);
  }
}

module.exports = { ServiceAddressPgRepository };