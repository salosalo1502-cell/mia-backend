import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import orderRoutes from './routes/order.routes.js';
import sendEmail from './controller/email.controller.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', orderRoutes);



app.post('/send_mail', sendEmail);


mongoose.connect(process.env.MONGODB_URL)
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });





const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  }

});



const Product = mongoose.model('Product', productSchema);



app.get('/products', async (req, res) => {

  try {

    const products = await Product.find({
      category: 'Women'
    });

    res.json({
      success: true,
      products: products
    });

  } catch (error) {

    console.error('Error fetching Women products:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch Women products'
    });

  }

});


app.get('/products/women/:category', async (req, res) => {

  try {

    const category = req.params.category;

    const products = await Product.find({
      category: 'Women',
      name: {
        $regex: new RegExp(`^${category}$`, 'i')
      }
    });

    res.json({
      success: true,
      products: products
    });

  } catch (error) {

    console.error('Error fetching Women category:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch Women category'
    });

  }

});




app.get('/products/men', async (req, res) => {

  try {

    const products = await Product.find({
      category: 'Men'
    });

    res.json({
      success: true,
      products: products
    });

  } catch (error) {

    console.error('Error fetching Men products:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch Men products'
    });

  }

});



app.post('/products', async (req, res) => {

  try {

    const products = req.body;

    const savedProducts = await Product.insertMany(products);

    res.json({
      success: true,
      products: savedProducts
    });

  } catch (error) {

    console.error('Error saving products:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to save products'
    });

  }

});



app.listen(5001, () => {
  console.log('Server is running on port 5001');
});