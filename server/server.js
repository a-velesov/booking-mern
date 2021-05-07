import express from 'express';
import { readdirSync } from 'fs';

const app = express();

readdirSync('./routes').map((r) =>
  app.use('/api', require(`./routes/${r}`)));

app.listen(5000, () => console.log('Server running'))