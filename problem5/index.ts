import * as express from 'express';
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import { userRoute } from './src/routes/userRoute'
import { json } from 'body-parser';

config();
const port = process.env.PORT || 3000;

mongoose.connect(`${process.env.MONGODB_URL}`)
const database = mongoose.connection

const app = express();
app.use(json())
app.use(userRoute)
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

database.once('connected', () => {
    console.log('Database Connected');
})