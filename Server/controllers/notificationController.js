import db from '../database_config/db';

export const addNotification = async (req, res) => {
    const { text, notifDate, notifType } = req.body;
    const sql = 'INSERT INTO notification (text, notifDate, notifType) VALUES (?, ?, ?)';

    try {
        await db.query(sql, [text, notifDate, notifType]);
        res.status(200).send('Notification added successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getNotifications = async (req, res) => {
    const sql = 'SELECT * FROM notification';

    try {
        const [notifications] = await db.query(sql);
        res.status(200).send(notifications);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getNotificationById = async (req, res) => {
    const _id = req.params.id;
    const sql = 'SELECT * FROM notification WHERE idNotification = ?';

    try {
        const notification = await db.query(sql, [_id]);
        res.status(200).send(notification);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateNotification = async (req, res) => {
    const _id = req.params.id;
    const { text, notifDate, notifType } = req.body;

    try {
        const sql = 'UPDATE notification SET text = ?, notifDate = ?, notifType = ? WHERE idNotification = ?';
        const [result] = await db.query(sql, [text, notifDate, notifType, _id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).send("No notification found with the given sender ID");
        }
        
        res.send("Notification updated successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const removeNotification = async (req, res) => {
    const _id = req.params.id;
    const sql = 'DELETE FROM notification WHERE idNotification = ?';

    try {
        await db.query(sql, [_id]);
        res.status(200).send("Notification deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};