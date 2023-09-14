import AdminLayout from '../../../components/admin/layout';
import db from '../../../utils/database';
import { useState } from 'react';
import Coupon from '../../../models/CouponModel';
import ListCoupons from '../../../components/admin/coupons/list';
import CreateCoupon from '../../../components/admin/coupons/created';

const CouponsAdminPage = ({ coupons }) => {

    const [data, setData] = useState(coupons);

    return (
        <>
            <AdminLayout>
                <main>
                    <CreateCoupon setCoupons={setData}/>
                    <ListCoupons
                        coupons={data}
                        setCoupons={setData}
                    />
                </main>
            </AdminLayout>
        </>
    )
}

export default CouponsAdminPage;

export async function getServerSideProps(context) {
    await db.connectDB();
    const coupons = await Coupon.find({}).sort({updatedAt: -1}).lean();
    await db.disconnectDB();

    return {
        props: {
            coupons: JSON.parse(JSON.stringify(coupons)),
        }
    }
};