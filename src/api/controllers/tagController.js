const Tag = require('../../models/tagModel');
const TagServices = require('../../services/TagServices');

const getAllTags = async function (req, res, next) {
  try {
    const tagServicesInstance = new TagServices(Tag);
    const tags = await tagServicesInstance.getAll();
    if (!tags)
      return res.status(201).json({
        message: 'There are no tags to display',
      });
    return res.status(200).json(tags);
  } catch (err) {
    next(err);
  }
};

const getOneTag = async function (req, res, next) {
  try {
    const tagServicesInstance = new TagServices(Tag);
    const tag = await tagServicesInstance.getOne(req.params.id);
    if (!tag)
      return res.status(404).json({
        message: 'The tag you are trying to search does not exist',
      });
    return res.status(200).json(tag);
  } catch (err) {
    next(err);
  }
};

const createTag = async function (req, res, next) {
  try {
    const tagServicesInstance = new TagServices(Tag);
    const tag = await tagServicesInstance.create(req.body);
    if (tag)
      return res.status(201).json({
        message: 'Created successfully',
        tag: tag,
      });
  } catch (err) {
    next(err);
  }
};

const modifyTag = async function (req, res, next) {
  try {
    const tagServicesInstance = new TagServices(Tag);
    const tag = await tagServicesInstance.modify({
      id: req.params.id,
      ...req.body,
    });
    if (!tag)
      res.status(404).json({
        message: 'The tag you are trying to edit does not exist',
      });
    return res.status(201).json({
      message: 'Modified successfully',
      tag: tag,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTags,
  getOneTag,
  createTag,
  modifyTag,
};
