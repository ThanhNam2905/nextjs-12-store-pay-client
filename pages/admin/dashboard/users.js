import AdminLayout from '../../../components/admin/layout';
import db from '../../../utils/database';
import { useState } from 'react';
import User from '../../../models/UserModel';
import ListUsers from '../../../components/admin/users/list';

const UsersAdminPage = ({ users }) => {
    const [data, setData] = useState(users);
    return (
        <>
            <AdminLayout>
                <main>
                    <ListUsers
                        users={data}
                        setUsers={setData}
                    />
                </main>
            </AdminLayout>
        </>
    )
}

export default UsersAdminPage;


export async function getServerSideProps(context) {
    await db.connectDB();

    const users = await User.find({}).sort({updatedAt: -1}).lean();

    await db.disconnectDB();
    return {
        props: {
            users: JSON.parse(JSON.stringify(users)),
        }
    };
};
