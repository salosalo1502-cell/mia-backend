

import Order from "../models/order.js";
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Order could not be created",
      error: error.message,
    });
  }
};

export default createOrder;

