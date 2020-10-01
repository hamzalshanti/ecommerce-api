const { Router } = require('express');
const router = Router();
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  modifyProduct,
} = require('../controllers/productController');

const uploader = require('../../middlewares/multerMiddleware');
const upload = uploader.fields([
  {
    name: 'mainImage',
    maxCount: 1,
  },
  {
    name: 'gallary',
    maxCount: 5,
  },
]);

router.get('/', getAllProducts);
router.get('/product/:id', getOneProduct);
router.post('/create-product', upload, createProduct);
router.patch('/modify-product/:id', modifyProduct);

module.exports = router;
