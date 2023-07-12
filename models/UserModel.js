import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: "Please enter your full name."
        },
        email: {
            type: String,
            required: "Please enter your email address.",
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: "Please enter your password."
        },
        role: {
            type: String,
            default: "user",
        },
        image: {
            type: String,
            default: "https://res.cloudinary.com/nam290596/image/upload/v1689180536/nextjs-12-store-pay/3607444_fgmhvj.png",
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        defaultPaymentMethod: {
            type: String,
            default: "",
        },
        address: {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            numberPhone: {
                type: String,
            },
            address1: {
                type: String,
            },
            address2: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
                type: String,
            },
            zipCode: {
                type: String,
            },
            active: {
                type: Boolean,
                default: false,
            }
        }
    }, 
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;