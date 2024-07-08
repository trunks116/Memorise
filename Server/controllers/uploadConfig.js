import multer from 'multer';
import path from 'path';

let filename = '';

export const mediaStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets'));
    },
    filename: (req, file, cb) => {
        let date = Date.now();
        let extension = path.extname(file.originalname);
        let fl = date + extension;
        cb(null, fl);
        filename = fl;
    }
});
