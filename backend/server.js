import express from 'express';
import dotenv from 'dotenv';
import Product from "./model/product.model.js";
import {connectDB} from "./config/db.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/api/products', async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all required fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in creating product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error("Error while fetching products: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.delete('/api/products/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch (error) {
        res.status(404).json({success: false, message: "Product not found"});
    }
});

app.put('/api/products/:id', async (req, res) => {
        const {id} = req.params;

        const product = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success: false, message: "Product not found"});
        }

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
            res.status(200).json({success: true, data: updatedProduct});
        } catch (error) {
            res.status(500).json({success: false, message: "Server Error"});
        }
    }
);

app.listen(port, () => {
    connectDB();
    console.log(`Server running at http://localhost:${port}`);
});
