import {connectDB} from "./config/db.js";
import ProductRoute from "./routes/product.route.js";

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/products', ProductRoute);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
});
