import { useSelector } from 'react-redux';
import SideBar from './sidebar';
import styles from './styles.module.scss'
import Head from 'next/head';

const AdminLayout = ({ children }) => {

    const { expandSideBar } = useSelector((state) => ({...state}));
    const showSideBar = expandSideBar.expandSideBar;

    return (
        <>
            <Head>
                <title>Dashboard Admin</title>
                <meta name="description" content="Store Pay Online Ecommerce" />
                <link rel="icon" href="https://icons.veryicon.com/png/o/miscellaneous/admin-dashboard-flat-multicolor/admin-roles.png" />
            </Head>
            <div className={styles.layout}>
                <SideBar/>
                <main 
                    className={styles.layout__main}
                    style={{ marginLeft: `${showSideBar ? "295px" : "95px"}`}}
                >
                    { children }
                </main>
            </div>
        </>
    )
}

export default AdminLayout;