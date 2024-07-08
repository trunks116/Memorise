import db from '../database_config/db';

export const addSharedNote = async (req, res) => {
    const { idSender, receivers, idNote, accessType } = req.body;
    const sql = 'INSERT INTO sharednote (idSender, receivers, idNote, accessType) VALUES (?, ?, ?, ?)';

    try {
        await db.query(sql, [idSender, receivers, idNote, accessType]);
        res.status(200).send('Shared note added successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getSharedNotes = async (req, res) => {
    const sql = 'SELECT * FROM sharednote';

    try {
        const [sharedNotes] = await db.query(sql);
        res.status(200).send(sharedNotes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getSharedNoteById = async (req, res) => {
    const _id = req.params.id;
    const sql = 'SELECT * FROM sharednote WHERE idSender = ?';

    try {
        const sharedNote = await db.query(sql, [_id]);
        res.status(200).send(sharedNote);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateSharedNote = async (req, res) => {
    const _id = req.params.id;
    const { receivers, idNote, accessType } = req.body;

    try {
        const sql = 'UPDATE sharednote SET receivers = ?, idNote = ?, accessType = ? WHERE idSender = ?';
        const [result] = await db.query(sql, [receivers, idNote, accessType, _id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).send("No shared note found with the given sender ID");
        }

        res.send("Shared note updated successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const removeSharedNote = async (req, res) => {
    const _id = req.params.id;
    const sql = 'DELETE FROM sharednote WHERE idSender = ?';

    try {
        await db.query(sql, [_id]);
        res.status(200).send("Shared note deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};