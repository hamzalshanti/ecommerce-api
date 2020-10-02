const { Router } = require('express');
const router = Router();
const {
  getAllTags,
  getOneTag,
  createTag,
  modifyTag,
} = require('../controllers/tagController');

router.get('/', getAllTags);
router.get('/tag/:id', getOneTag);
router.post('/create-tag', createTag);
router.patch('/modify-tag/:id', modifyTag);

module.exports = router;
