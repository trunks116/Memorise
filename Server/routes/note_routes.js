import express from 'express';
import noteController from '../controllers/noteController';

const router = express.Router();

router.post('/note/add' ,noteController.addNote);
router.get('/notes', noteController.getNotes);
router.get('/note/:id', noteController.getNoteById);
router.put('/note/edit/:id', noteController.updatedNote);
router.delete('/note/delete/:id', noteController.removeNote);

export default router;