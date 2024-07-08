import express from "express";
import categoryController from '../controllers/categoryController';

const router = express.Router();

router.post('/category/add' ,categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategoryByID);
router.put('/category/edit/:id', categoryController.UpdateCategory);
router.delete('/category/delete/:id', categoryController.deleteCategory);

export default router;