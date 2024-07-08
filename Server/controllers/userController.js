import db from '../database_config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const addUser = async (req, res) => {
    const { fullName, email, password, role } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hashSync(password, salt);
    const sql = 'INSERT INTO user (fullName, email, password, role) VALUES (?, ?, ?, ?)';

    try {
        const [result] = await db.query(sql, [fullName, email, hashedpassword, role]);
        if (result) {
            console.log("User Registered")
        };
        res.send('User added successfully');
    } catch (error) {
        res.status(500).send(error.message);
        console.log("Error during user registration : " + error);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM user WHERE email=?'
    try {
        const [rows] = await db.query(sql, [email]);
        if (rows.length === 0) {
            return res.status(404).send("Email or password invalid");
        }
        const fetchedUser = rows[0];
        const validPass = bcrypt.compareSync(password, fetchedUser.password);

        if (!validPass) {
            return res.status(401).send("Email or password invalid");
        }

        const payload = {
            _id: fetchedUser.idUser,
            email: fetchedUser.email,
            fullName: fetchedUser.fullName
        };

        const token = jwt.sign(payload, "123456789", { expiresIn: '1h' });
        return res.status(200).send({ mytoken: token });
    } catch (error) {
        res.status(500).send(error.message);
        console.log("Error occured during connection : " + error)
    }
};

export const getUsers = async (req, res) => {
    try {
        const [users] = await db.query("SELECT * FROM user");
        res.send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const getUserById = async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await db.query("SELECT * FROM user WHERE idUser = ?", [_id]);
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updatedUser = async (req, res) => {
    const _id = req.params.id;
    const { fullName, email, password, role } = req.body;

    const sql = "UPDATE user SET fullName = ?, email = ?, password = ?, role = ? WHERE idUser = ?";
    try {
        await db.query(sql, [fullName, email, password, role, _id]);
        res.send("User updated successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const removeUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteSharedNote = "DELETE FROM sharednote WHERE idSender = ?";
        const deleteNote = "DELETE FROM note WHERE userId = ?";
        const deleteTask = "DELETE FROM task WHERE userId = ?";
        const deletedUser = "DELETE FROM user WHERE idUser = ?";

        await db.query(deleteSharedNote, [_id]);
        await db.query(deleteNote, [_id]);
        await db.query(deleteTask, [_id]);
        await db.query(deletedUser, [_id]);

        res.status(200).send('User was deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


