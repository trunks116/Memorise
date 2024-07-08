import express from 'express';
import notificationController from '../controllers/notificationController';

const router = express.Router();

router.post('/notification/add', notificationController.addNotification);
router.get('/notifications', notificationController.getNotifications);
router.get('/notification/:id', notificationController.getNotificationById);
router.put('/notification/edit/:id', notificationController.updateNotification);
router.delete('/notification/delete/:id', notificationController.removeNotification);

export default router;