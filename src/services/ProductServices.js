const { cloudinary } = require('../config/cloudinary');
const DatauriParser = require('datauri/parser');
const path = require('path');

class ProductServices {
  constructor(Product) {
    this.Product = Product;
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
  async create(data) {
    const product = await this.Product.create(data);
    if (!product) return false;
    return product;
  }
  async modify(id, data) {
    const product = await this.Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!product) return false;
    return product;
  }
  async getGallaryUrls(gallaryFiles) {
    if (gallaryFiles)
      if (gallaryFiles.length > 0) {
        const parser = new DatauriParser();
        return {
          gallary: await Promise.all(
            gallaryFiles.map(async (file) => {
              const content = parser.format(
                path.extname(file.originalname),
                file.buffer
              ).content;
              const result = await cloudinary.uploader.upload(content);
              return result.secure_url;
            })
          ),
        };
      }
  }
  async getMianImageUrl(mainImageFile) {
    if (mainImageFile)
      if (mainImageFile.length > 0) {
        const parser = new DatauriParser();
        const content = parser.format(
          path.extname(mainImageFile[0].originalname),
          mainImageFile[0].buffer
        ).content;
        const result = await cloudinary.uploader.upload(content);
        return { mainImage: result.secure_url };
      }
  }
}

module.exports = ProductServices;
