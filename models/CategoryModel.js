import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
    {
        nameCategory: {
            type: String,
            required: "Please enter your name category.",
            minlength: [2, "Please have at least 2 characters"],
            maxlength: [50, "Please have a maximum of 50 characters"],
        },
        slugCategory: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;