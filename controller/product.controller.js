import Product from '../models/Product.js';

const getProducts = async (req, res) => {

  try {

    const products = await Product.find({
      category: "Women"
    });

    res.status(200).json(products);

  } catch (error) {

    console.error('Error fetching products:', error.message);

    res.status(500).json({
      success: false,
      message: 'Could not fetch products'
    });

  }

};

export default getProducts;