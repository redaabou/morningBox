import express from 'express';
import path from 'path';
import cors from 'cors';
import config from '../config/config.js';
import errorHandler from './middlewares/errorHandler.js';
import cafeteriaRoutes from './routes/cafeteriaRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());

app.use(config.apiVersion, cafeteriaRoutes);
app.use(config.apiVersion, menuRoutes);
app.use(config.apiVersion, authRoutes);

app.use(errorHandler);

export default app;