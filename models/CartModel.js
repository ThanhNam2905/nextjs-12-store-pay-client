import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: "Product",
                },
                name: {
                    type: String,
                },
                size: {
                    type: String,
                },
                /*
                style: {
                    style: {
                        type: String,
                    },
                    color: {
                        type: String,
                    },
                    image: {
                        type: String,
                    },
                },
                */
                qty: {
                    type: Number,
                },
                color: {
                    color: {
                        type: String,
                    },
                    image: {
                        type: String,
                    },
                },
                price: {
                    type: Number,
                },
            }
        ],
        cartTotalPrice: {
            type: Number,
        },
        totalAfterDiscount: {
            type: Number,
        },
        user: {
            type: ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;