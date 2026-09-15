



import mongoose from "mongoose";



const orderSchema = new mongoose.Schema(
  {
    customer: {
      firstName: {
        type: String,
        required: true,
      },

      lastName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },
    },

    items: [
      {
        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        image: {
          type: String,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);




