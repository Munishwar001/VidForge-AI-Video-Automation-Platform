import './config/env.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((error, req, res, next) => {
	try {
		console.error(error); 
		if (error.message === 'Only image files (jpeg, png) are allowed!') {
			return res.status(400).json({ message: error.message });
		  }

		if (error.status) {
			return res.status(error.status).json({ error: error.message });
		}

		return res.status(500).json({
			error: 'Internal server error',
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Internal server error',
		});
	}
});

export default app;
