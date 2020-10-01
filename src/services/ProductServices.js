const { cloudinary } = require('../config/cloudinary');
const DatauriParser = require('datauri/parser');
const path = require('path');

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
    gallary,
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
      gallary,
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
  async getImages(gallaryFiles, mainImageFile) {
    const parser = new DatauriParser();
    let gallary = [];
    let mainImage = '';
    let content = '';
    if (gallaryFiles)
      if (gallaryFiles.length > 0)
        gallary = await Promise.all(
          gallaryFiles.map(async (file) => {
            content = parser.format(
              path.extname(file.originalname),
              file.buffer
            ).content;
            const result = await cloudinary.uploader.upload(content);
            return result.secure_url;
          })
        );
    if (mainImageFile)
      if (mainImageFile.length > 0) {
        content = parser.format(
          path.extname(mainImageFile[0].originalname),
          mainImageFile[0].buffer
        ).content;
        const result = await cloudinary.uploader.upload(content);
        mainImage = result.secure_url;
      }
    return { mainImage, gallary };
  }
}
module.exports = ProductServices;
