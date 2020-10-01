class ProductServices {
  constructor(Product) {
    this.Product = Product;
  }
  async create({
    name,
    description,
    category,
    qty,
    price,
    discount,
    mainImage,
    createdBy,
  }) {
    const product = await this.Product.create({
      name,
      description,
      category,
      qty,
      price,
      discount,
      mainImage,
      createdBy,
    });
    if (!product) return false;
    return product;
  }
  async getAll() {
    const products = await this.Product.find().select({
      name: 1,
      description: 1,
      qty: 1,
      price: 1,
      discount: 1,
    });
    if (products.length === 0) return false;
    return products;
  }
  async getOne(id) {
    const product = await this.Product.findById(id).select({
      name: 1,
      description: 1,
      qty: 1,
      price: 1,
      discount: 1,
      createdby: 1,
    });
    if (products) return false;
    return product;
  }
}
module.exports = ProductServices;
