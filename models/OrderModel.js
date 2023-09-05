import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User", 
            required: true,
        },
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: {
                    type: String,
                },
                image: {
                    type: String,
                },
                qty: {
                    type: Number,
                },
                size: {
                    type: String,
                },
                color: {
                    color: { type: String },
                    image: { type: String },
                },
                price: {
                    type: Number,
                },
            }
        ],
        shippingAddress: {
            fullname: {
                type: String,
            },
            number_phone: {
                type: String,
            },
            specific_address: {
                type: String,
            },
            city: {
                type: String,
            },
            districts: {
                type: String,
            },
            wards: {
                type: String,
            },
        },
        paymentMethod: {
            type: String,
        },
        paymentResult: {
            id: {
                type: String,
            },
            status: {
                type: String,
            },
            email_address: {
                type: String,
            }

        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        totalBeforeDiscount: {
            type: Number,
        },
        couponApplied: {
            type: String,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        discount: {
            type: Number,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        status: {
            type: String,
            default: "Chờ xác nhận",
            enum: [
                "Chờ xác nhận",
                "Đã xác nhận",
                "Đang chuẩn bị hàng",
                "Đang giao hàng",
                "Đã giao hàng",
                "Đã huỷ",
            ]
        },
        paidAt: {
            type: Date,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;