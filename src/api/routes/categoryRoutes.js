const { Router } = require('express');
const router = Router();
const {
  getAllCategories,
  getOneCategory,
  createCategory,
  modifyCategory,
} = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.get('/category/:id', getOneCategory);
router.post('/create-category', createCategory);
router.patch('/modify-category/:id', modifyCategory);

module.exports = router;
