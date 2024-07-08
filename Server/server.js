import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from 'helmet';

import note_routes from './routes/note_routes';
import user_routes from './routes/user_routes';
import task_routes from './routes/task_routes';
import category_routes from './routes/category_routes';
import sharedNote_routes from './routes/sharedNote_routes';
import notification_routes from './routes/notification_routes';

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ limit: '30mb' }));
app.use(bodyParser.json());
app.use(helmet())
app.use(cors());

app.use(note_routes);
app.use(user_routes);
app.use(task_routes);
app.use(category_routes);
app.use(sharedNote_routes);
app.use(notification_routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


