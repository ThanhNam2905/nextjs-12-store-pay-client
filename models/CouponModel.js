import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
    {
        coupon: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            uppercase: true,
            minLength: 6,
            maxLength: 10,
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
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;