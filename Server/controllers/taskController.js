import db from '../database_config/db';

export const addTask = async (req, res) => {
    const { description, submitDate, userId } = req.body;
    const sql = "INSERT INTO task (description, submitDate, userId) VALUES (?, ?, ?)";
    
    try {
            await db.query(sql, [description, submitDate, userId]);
            res.status(200).send("Task added successfully");
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const getTasks = async (req, res) => {
    try {
        const [tasks] = await db.query("SELECT * FROM task");
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const getTaskById = async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await db.query("SELECT * FROM task WHERE idTask = ?", [_id]);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updatedTask = async (req, res) => {
    const _id = req.params.id;
    const { description, submitDate} = req.body;

    const sql = "UPDATE task SET description = ?, submitDate = ? WHERE idTask= ?";
    try {
        await db.query(sql, [ description, submitDate, _id ]);
        res.status(200).send("Task updated successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const removeTask = async (req, res) => {
    try {
        const _id = req.params.id;
        await db.query("DELETE FROM task where idTask = ?", [_id]);
        res.status(200).send('Task was deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


