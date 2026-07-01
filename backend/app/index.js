import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
	try {
		console.error(error); 
		if (error.message === 'Only image files (jpeg, png) are allowed!') {
			return res.status(400).json({ message: error.message });
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
