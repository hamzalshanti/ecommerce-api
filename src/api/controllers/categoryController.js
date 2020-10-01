const Category = require('../../models/categoryModel');
const CategoryServices = require('../../services/CategoryServices');

const getAllCategories = async function (req, res, next) {
  try {
    const categoryServicesInstance = new CategoryServices(Category);
    const categories = await categoryServicesInstance.getAll();
    if (!categories)
      return res.status(201).json({
        message: 'There are no categories to display',
      });
    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

const getOneCategory = async function (req, res, next) {
  try {
    const categoryServicesInstance = new CategoryServices(Category);
    const category = await categoryServicesInstance.getOne(req.params.id);
    if (!category)
      return res.status(404).json({
        message: 'The category you are trying to search does not exist',
      });
    return res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

const createCategory = async function (req, res, next) {
  try {
    const categoryServicesInstance = new CategoryServices(Category);
    const category = await categoryServicesInstance.create(req.body);
    if (category)
      return res.status(201).json({
        message: 'Created successfully',
        category: category,
      });
  } catch (err) {
    next(err);
  }
};

const modifyCategory = async function (req, res, next) {
  try {
    const categoryServicesInstance = new CategoryServices(Category);
    const category = await categoryServicesInstance.modify({
      id: req.params.id,
      ...req.body,
    });
    if (!category)
      res.status(404).json({
        message: 'The category you are trying to edit does not exist',
      });
    return res.status(201).json({
      message: 'Modified successfully',
      category: category,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  modifyCategory,
};
