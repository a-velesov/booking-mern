import express from 'express';
import { readdirSync } from 'fs';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 8000;

app.use(morgan('dev'));

readdirSync('./routes').map((r) =>
  app.use('/api', require(`./routes/${r}`)));

app.listen(port, () => console.log('Server running ', port))