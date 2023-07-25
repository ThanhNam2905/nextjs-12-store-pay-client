import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
    {
        nameSubCategory: {
            type: String,
            required: "Please enter your name sub category.",
            minlength: [2, "Please have at least 2 characters"],
            maxlength: [50, "Please have a maximum of 50 characters"],
        },
        slugSubCategory: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        parentId: {
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