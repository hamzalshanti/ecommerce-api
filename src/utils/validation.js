const { body } = require('express-validator');
const Category = require('../models/categoryModel');

const productValidation = [
  body('name').trim().notEmpty().withMessage('name can not be empty'),
  body('price').trim().isNumeric().withMessage('Must Number'),
  body('qty').trim().isNumeric().withMessage('Qty must be number'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description can not be empty'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('please select category')
    .custom(async (value) => {
      try {
        const category = await Category.findById(value);
        if (category) return true;
        throw 'the category selected not found';
      } catch (err) {
        throw 'the category selected not found';
      }
    }),
  body('discount')
    .isNumeric()
    .custom((value) => {
      if (value >= 1 && value <= 99) return true;
      throw 'only numbers between 1 and 99';
    }),
];

const categoryValidation = [
  body('name').trim().notEmpty().withMessage('category name cannot be empty'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('category description cannot be empty'),
];

const tagValidation = [
  body('name').trim().notEmpty().withMessage('tag name cannot be empty'),
];

module.exports = {
  productValidation,
  categoryValidation,
  tagValidation,
};
