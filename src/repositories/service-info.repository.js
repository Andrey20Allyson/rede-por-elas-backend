const { ServiceInfoFilters, ServiceInfo } = require("../domains/service-info");
const { pgConnect } = require("../helpers/postgres");
const { ServiceInfoTransformer } = require("../transformers/service-info.transformer");

class ServiceInfoPgRepository {
  static INSTANCE = new ServiceInfoPgRepository();

  transformer = new ServiceInfoTransformer();

  /**
   * 
   * @param {ServiceInfo} service 
   */
  async create(service) {
    const client = await pgConnect();

    const result = await client.query(`
      INSERT INTO service_info (name, description, category_id, href, phone)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING service_info_id`,
      [service.name, service.description, service.category.id, service.href, service.phone],
    );

    await client.end();

    const id = result.rows[0].id;

    return await this.findById(id);
  }

  async findById(id) {
    const client = await pgConnect();

    const result = await client.query(`
    SELECT 
      s.*,
      c.name AS category_name,
      a.city AS address_city,
      a.neighborhood AS address_neighborhood,
      a.street AS address_street,
      a.number AS address_number,
      a.complement AS address_complement
    FROM service_info s
    LEFT JOIN service_category c
      ON s.category_id = c.service_category_id
    LEFT JOIN service_address a
      ON s.address_id = a.service_address_id
    WHERE s.service_info_id = $1`, [id]);

    await client.end();

    const row = result.rows[0];

    return this.transformer.rowToEntity(row);
  }

  /**
   * 
   * @param {ServiceInfoFilters} filters 
   */
  async list(filters) {
    let query = `
    SELECT 
      s.*,
      c.name AS category_name,
      a.city AS address_city,
      a.neighborhood AS address_neighborhood,
      a.street AS address_street,
      a.number AS address_number,
      a.complement AS address_complement
    FROM service_info s
    LEFT JOIN service_category c
      ON s.category_id = c.service_category_id
    LEFT JOIN service_address a
      ON s.address_id = a.service_address_id
    WHERE 1=1`;
    let params = [];

    if (filters.category_id != null) {
      params.push(filters.category_id);
      query += ` AND category_id = $${params.length}`;
    }

    const client = await pgConnect();

    const result = await client.query(query, params);

    await client.end();

    return result
      .rows
      .map(row => this.transformer.rowToEntity(row));
  }
}

module.exports = { ServiceInfoPgRepository };