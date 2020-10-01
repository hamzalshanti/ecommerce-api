const Product = require('../../models/productModel');
const ProductServices = require('../../services/ProductServices');

const getAllProducts = async function (req, res, next) {
  try {
    const productServicesInstance = new ProductServices(Product);
    const products = await productServicesInstance.getAll();
    if (!products)
      return res.status(201).json({
        message: 'There are no products to display',
      });
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getOneProduct = async function (req, res, next) {
  try {
    const productServicesInstance = new ProductServices(Product);
    const product = await productServicesInstance.getOne();
    if (!product)
      return res.status(404).json({
        message: 'The product you are trying to search does not exist',
      });
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = async function (req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
};

const modifyProduct = async function (req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  modifyProduct,
};
