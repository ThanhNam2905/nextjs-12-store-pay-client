import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Please enter your name category.",
            minlength: [3, "Please have at least 3 characters"],
            maxlength: [40, "Please have a maximum of 40 characters"],
        },
        slug: {
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