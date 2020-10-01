const { Router } = require('express');
const router = Router();
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);

module.exports = router;
