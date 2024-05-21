import express from 'express';
import { json } from 'body-parser';
import { config } from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import limiter from './middlewares/rateLimit.js';
import routes from './routes/index.js';

config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(json());

app.use(limiter);

app.use('/api', routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

export default app;
