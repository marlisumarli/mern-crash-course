import {connectDB} from "./config/db.js";
import ProductRoute from "./routes/product.route.js";

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;

const __dirname = path.resolve();

app.use(express.json());

app.use('/api/products', ProductRoute);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

// app.get('/', (req, res) => {
//     res.send('Server is running');
// });

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at ${BASE_URL}:${PORT}`);
});
