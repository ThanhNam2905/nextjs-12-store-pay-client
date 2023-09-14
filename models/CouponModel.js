import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
    {
        coupon: {
            type: String,
            required: true,
            trim: true,
            // unique: true,
            uppercase: true,
            minLength: 6,
            maxLength: 20,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        quantity: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;