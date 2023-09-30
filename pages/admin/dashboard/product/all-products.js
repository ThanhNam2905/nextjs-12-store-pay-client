import { useState } from 'react';
import AdminLayout from '../../../../components/admin/layout';
import ListProducts from '../../../../components/admin/products/list';
import Product from '../../../../models/ProductModel';
import styles from '../../../../styles/admin/products.module.scss'
import db from '../../../../utils/database';
import Category from '../../../../models/CategoryModel';

const AllProductsPage = ({ products }) => {
    const [data, setData] = useState(products);
    return (
        <>
            <AdminLayout>
                <main>
                    <ListProducts
                        products={data}
                        setProducts={setData}
                    />
                </main>
            </AdminLayout>
        </>
    )
}

export default AllProductsPage;

export async function getServerSideProps(context) {
    await db.connectDB();
    const products = await Product.find({})
        .populate({path: "category", model: Category})
        .sort({updatedAt: -1}).lean();
    await db.disconnectDB();
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        }
    }
};