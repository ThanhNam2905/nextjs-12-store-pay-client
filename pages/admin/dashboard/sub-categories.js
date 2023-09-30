import AdminLayout from '../../../components/admin/layout';
import db from '../../../utils/database';
import Category from '../../../models/CategoryModel';
import { useState } from 'react';
import SubCategory from '../../../models/SubCategoryModel';
import CreateSubCategory from '../../../components/admin/sub-categories/create';
import ListSubCategories from '../../../components/admin/sub-categories/list';

const SubCategoriesAdminPage = ({ categories, subCategories }) => {
    const [data, setData] = useState(subCategories);
    return (
        <>
            <AdminLayout>
                <main>
                    <CreateSubCategory 
                        setSubCategories={setData} 
                        categories={categories}
                    />
                    <ListSubCategories
                        subCategories={data}
                        setSubCategories={setData}
                        categories={categories}
                    />
                </main>
            </AdminLayout>
        </>
    )
}

export default SubCategoriesAdminPage;

export async function getServerSideProps(context) {
    await db.connectDB();
    const categories = await Category.find({}).sort({updatedAt: -1}).lean();
    const subCategories = await SubCategory.find({})
        .populate({path: "parent", model: Category})
        .sort({updatedAt: -1})
        .lean();
    await db.disconnectDB();
    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
        }
    }
};