import express from "express"
import userController from '../controllers/userController';

const router = express.Router();

router.post('/user/register', userController.addUser);
router.post('/user/login', userController.login);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/edit/:id', userController.updatedUser);
router.delete('/user/delete/:id', userController.removeUser);

export default router;