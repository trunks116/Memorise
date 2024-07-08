import express from 'express';
import taskController from '../controllers/taskController';

const router = express.Router();

router.post('/task/add', taskController.addTask);
router.get('/tasks', taskController.getTasks);
router.get('/task/:id', taskController.getTaskById);
router.put('/task/edit/:id', taskController.updatedTask);
router.delete('/task/delete/:id', taskController.removeTask);

export default router;