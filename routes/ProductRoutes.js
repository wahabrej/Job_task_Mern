import express from 'express'
import formidable from 'express-formidable'
const router = express.Router();
import { requireSignIn,isAdmin } from '../middlewares/authMiddleware.js';
import {createProductController,
        singleProductController,
        getProductController,
        ProductphotoController,
        deleteProductController,
        updateProductController,
        filterProductController,
        searchProductController,
        similarProductController} from '../controllers/productController.js';
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)
router.get('/get-product',getProductController)
router.get('/single-product/:id',singleProductController)
router.get('/product-photo/:id',ProductphotoController)
router.delete('/delete-product/:id',deleteProductController)
router.put('/update-product/:id',requireSignIn,isAdmin,formidable(),updateProductController)
router.post('/filter-product', filterProductController);
router.get('/filter-search/:keyword', searchProductController);
router.get('/similar-product/:pid/:cid', similarProductController);


export default router