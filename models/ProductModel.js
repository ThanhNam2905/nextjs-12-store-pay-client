import mongoose from 'mongoose';
// const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    reviewBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    review: {
        type: String,
        required: true,
    },
    size: {
        type: String,
    },
    style: {
        color: String,
        image: String,
    },
    fit: {
        type: String,
    },
    images: [],
    likes: [],
});

const productSchema = new mongoose.Schema(
    {
        nameProduct: {
            type: String,
            required: "Please enter your name product.",
        },
        slugProduct: {
            type: String,
            index: true,
            lowercase: true,
            unique: true,
        },
        description: {
            type: String,
            required: "Please enter your description.",
        },
        brand: {
            type: String,
            default: "",
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Category",
        },
        subCategories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubCategory",
            }
        ],
        detailsProduct: [
            {
                name: String,
                value: String,
            },
        ],
        questions: [
            {
                question: String,
                answer: String,
            }
        ],
        refundPolicy: {
            type: String,
            default: "sau 30 ngày",
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numberReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        shipping: {
            type: Number,
            required: true,
            default: 0,
        },
        subProducts: [
            {
                sku: {
                    type: String,
                },
                images: [],
                description_images: [],
                color: {
                    color: {
                        type: String,
                    },
                    image: {
                        type: String,
                    }
                },
                sizes: {
                    size: String,
                    qty: Number,
                    price: Number,
                },
                discount: {
                    type: Number,
                    default: 0,
                },
                sold: {
                    type: Number,
                    default: 0,
                }
            }
        ],
        reviews: [reviewSchema],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;