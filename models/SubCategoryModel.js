import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Please enter your name sub category.",
            minlength: [3, "Please have at least 3 characters"],
            maxlength: [50, "Please have a maximum of 50 characters"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        parent: {
            type: ObjectId,
            required: true,
            ref: "Category",
        },
    }, {
        timestamps: true,
    }
);

const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;