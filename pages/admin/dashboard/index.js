import AdminLayout from '../../../components/admin/layout';
import styles from '../../../styles/admin/dashboard.module.scss'
import { toast } from 'react-toastify';

const DashboardAdminPage = () => {
    return (
        <>
            <AdminLayout>
                Main Content
                <button onClick={() => {
                    toast.success(' Wow so easy!', {
                        position: "top-right",
                    });
                }}>Click show toastify</button>
            </AdminLayout>
        </>
    )
};

export default DashboardAdminPage;
