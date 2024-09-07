import express from 'express';
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
const router = express.Router();
import {   
    createCategoryController, 
    getAllCategoryController,
    updateCategoryController,
    deleteCategoryController,
    singleCategoryController } from '../controllers/CategoryController.js';
//import { createCategoryController } from '../controllers/CategoryController.js';
router.post('/create-category',
requireSignIn,
isAdmin,
createCategoryController)

router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
  );

  router.get(
    "/getall-category",
    getAllCategoryController
  );

  
  router.get(
    "/single-category/:id",
    singleCategoryController
  );

  router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
  );
  
export default router