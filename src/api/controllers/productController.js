const Product = require('../../models/productModel');
const ProductServices = require('../../services/ProductServices');
const { validationResult } = require('express-validator');

const getAllProducts = async function (req, res, next) {
  try {
    const productServicesInstance = new ProductServices(Product);
    const products = await productServicesInstance.getAll();
    if (!products)
      return res.status(200).json({
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
    let { errors } = validationResult(req);
    if (errors.length > 0) return res.status(301).json(errors);
    const productServicesInstance = new ProductServices(Product);
    const product = await productServicesInstance.create({
      ...(await productServicesInstance.getGallaryUrls(req.files['gallary'])),
      ...(await productServicesInstance.getMianImageUrl(
        req.files['mainImage']
      )),
      ...req.body,
    });
    if (product)
      return res.status(201).json({
        message: 'Created successfully',
        product: product,
      });
    return res.status(500).json({
      message: 'error',
    });
  } catch (err) {
    next(err);
  }
};

const modifyProduct = async function (req, res, next) {
  try {
    const productServicesInstance = new ProductServices(Product);
    const product = await productServicesInstance.modify(req.params.id, {
      ...(await productServicesInstance.getGallaryUrls(req.files['gallary'])),
      ...(await productServicesInstance.getMianImageUrl(
        req.files['mainImage']
      )),
      ...req.body,
    });
    if (!product)
      return res.status(404).json({
        message: 'The product you are trying to modify does not exist',
      });
    return res.status(200).json({
      message: 'Modified successfully',
      product: product,
    });
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
