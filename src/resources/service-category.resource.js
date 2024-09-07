const { CreateServiceCategoryDTO } = require("../domains/service-category");
const { ok, conflict } = require("../helpers/responses");
const { ServiceCategoryPgRepository } = require("../repositories/service-category.repository");
const { ServiceCategoryTransformer } = require("../transformers/service-category.transformer");

class ServiceCategoryResource {
  static INSTANCE = new ServiceCategoryResource();

  transformer = ServiceCategoryTransformer.INSTANCE;
  repository;
  
  constructor(repository = ServiceCategoryPgRepository.INSTANCE) {
    this.repository = repository;
  }

  async list() {
    const categories = await this.repository.list();

    const dtos = categories.map(category => this.transformer.entityToDTO(category));

    return ok(dtos);
  }

  /**
   * 
   * @param {CreateServiceCategoryDTO} categoryDTO 
   */
  async create(categoryDTO) {
    const category = this.transformer.creationDTOToEntity(categoryDTO);

    const categoryWithSameName = await this.repository.findByName(category.name);
    if (categoryWithSameName != null) {
      return conflict('Name');
    }

    const createdCategory = await this.repository.create(category);

    return ok(createdCategory);
  }
}

module.exports = { ServiceCategoryResource };