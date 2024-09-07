const { pgConnect } = require("../helpers/postgres");
const { ServiceCategoryTransformer } = require("../transformers/service-category.transformer");

class ServiceCategoryPgRepository {
  static INSTANCE = new ServiceCategoryPgRepository();

  transformer = ServiceCategoryTransformer.INSTANCE;

  async list() {
    const client = await pgConnect();

    const result = await client.query('SELECT * FROM service_category');

    await client.end();

    return result
      .rows
      .map(row => this.transformer.rowToEntity(row));
  }

  async findByName(name) {
    const client = await pgConnect();

    const result = await client.query('SELECT * FROM service_category WHERE name = $1', [name]);

    await client.end();

    const row = result.rows[0];

    if (row == null) {
      return null;
    }

    return this.transformer.rowToEntity(row);
  }

  async create(entity) {
    const client = await pgConnect();

    const result = await client.query('INSERT INTO service_category (name) VALUES ($1) RETURNING *', [
      entity.name,
    ]);

    await client.end();

    const row = result.rows[0];

    return this.transformer.rowToEntity(row);
  }
}

module.exports = { ServiceCategoryPgRepository };