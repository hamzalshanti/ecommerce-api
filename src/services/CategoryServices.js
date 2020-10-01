class CategoryServices {
  constructor(Category) {
    this.Category = Category;
  }
  async create({ name, description }) {
    const category = await this.Category.create({ name, description });
    if (!category) return false;
    return category;
  }
  async modify({ id, name, description }) {
    const category = await this.Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      {
        new: true,
      }
    ).select({
      name: 1,
      description: 1,
      updatedAt: 1,
    });

    if (!category) return false;
    return category;
  }
  async getOne(id) {
    const category = await this.Category.findById(id).select({
      __v: 0,
    });
    if (!category) return false;
    return category;
  }
  async getAll() {
    const categories = await this.Category.find().select({
      name: 1,
      description: 1,
    });
    if (categories.length === 0) return false;
    return categories;
  }
}
module.exports = CategoryServices;
