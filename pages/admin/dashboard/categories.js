import AdminLayout from '../../../components/admin/layout';
import db from '../../../utils/database';
import Category from '../../../models/CategoryModel';
import { useState } from 'react';
import CreateCategory from '../../../components/admin/categories/create';
import ListCategories from '../../../components/admin/categories/list';

const CategoriesAdminPage = ({ categories }) => {

    const [data, setData] = useState(categories);

    return (
        <>
            <AdminLayout>
                <main>
                    <CreateCategory setCategories={setData}/>
                    <ListCategories
                        categories={data}
                        setCategories={setData}
                    />
                </main>
            </AdminLayout>
        </>
    )
}

export default CategoriesAdminPage;

export async function getServerSideProps(context) {
    await db.connectDB();
    const categories = await Category.find({}).sort({updatedAt: -1}).lean();
    await db.disconnectDB();

    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
        }
    }
};