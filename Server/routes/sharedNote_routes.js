import express from 'express';
import sharedNoteController from '../controllers/sharedNoteController';

const router = express.Router();

router.post('/sharednote/add', sharedNoteController.addSharedNote);
router.get('/sharednotes', sharedNoteController.getSharedNotes);
router.get('/sharednote/:id', sharedNoteController.getSharedNoteById);
router.put('/sharednote/edit/:id', sharedNoteController.updateSharedNote);
router.delete('/sharednote/delete/:id', sharedNoteController.removeSharedNote);

export default router;