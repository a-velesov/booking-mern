import express from 'express';
import { readdirSync } from 'fs';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import {errorHandler} from './middlewares/index'

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 8000;
const dbUrl = process.env.DB_URL;

app.use(morgan('dev'));
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(express.json());

readdirSync('./routes').map((r) =>
  app.use('/api', require(`./routes/${ r }`)));

app.use(errorHandler);
async function startApp() {
  try {
    await mongoose.connect(dbUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
    app.listen(port,
      () => console.log('server start ' + port));
  } catch(e) {
    console.log(e);
  }
}

startApp();