import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss'
import { toggleSideBar } from '../../../../store/expandSlice';
/* ------------------------------------------------------ */
import { MdArrowForwardIos, MdSpaceDashboard, MdOutlineNotificationsNone } from "react-icons/md";
import { BsFillBarChartLineFill, BsFillBoxSeamFill, BsListUl, BsPlusCircle } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
/* ------------------------------------------------------ */
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Tooltip } from '@mui/material';
import { useRouter } from 'next/router';

const SideBar = () => {
    const router = useRouter();
    const route = router.pathname.split("/admin/dashboard/")[1];
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const { expandSideBar } = useSelector((state) => ({...state}));
    const expand = expandSideBar.expandSideBar;

    const handleExpand = () => {
        dispatch(toggleSideBar());
    }

    return (
        <aside className={`${styles.sidebar} ${expand ? styles.opened : ""}`}>
            <div 
                className={styles.sidebar__toggle}
                onClick={() => handleExpand()}
            >
                <Tooltip 
                    title={expand ? 
                        <p style={{ fontSize: "15px", padding: "3px"}}>Ẩn</p>
                        : <p style={{ fontSize: "15px", padding: "3px"}}>Hiển thị</p> 
                    } 
                    enterDelay={100} leaveDelay={100}
                    arrow
                >
                    <div style={{ transform: `${expand ? "rotate(180deg)" : ""}`, transition: "all 0.25s linear" }}>
                        <MdArrowForwardIos/>
                    </div>
                </Tooltip>
            </div>
            <div className={styles.sidebar__container}>
                <div className={styles.sidebar__header}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={styles.sidebar__user}>
                    <img src={session?.user?.image} alt={session?.user?.image} />
                    <div className={styles.info}>
                        <span>Welcome back 👋</span>
                        <span>{session?.user?.name}</span>
                    </div>
                </div>
                <ul className={styles.sidebar__list}>
                    <li className={route === undefined ? styles.active : ""}>
                        <Link href={"/admin/dashboard"}>
                            <MdSpaceDashboard/>
                            <span className={styles.item__link}>Dashboard</span>
                        </Link>
                    </li>
                    <li className={route === "sales" ? styles.active : ""}>
                        <Link href={"/admin/dashboard/sales"}>
                            <BsFillBarChartLineFill/>
                            <span className={styles.item__link}>Sales</span>
                        </Link>
                    </li>
                    <li className={route === "orders" ? styles.active : ""}>
                        <Link href={"/admin/dashboard/orders"}>
                            <BsFillBoxSeamFill/>
                            <span className={styles.item__link}>Orders</span>
                        </Link>
                    </li>
                    <li className={route === "users" ? styles.active : ""}>
                        <Link href={"/admin/dashboard/users"}>
                            <FaUsers/>
                            <span className={styles.item__link}>Users</span>
                        </Link>
                    </li>
                    <li className={route === "messages" ? styles.active : ""}>
                        <Link href={"/admin/dashboard/messages"}>
                            <AiFillMessage/>
                            <span className={styles.item__link}>Messages</span>
                        </Link>
                    </li>
                </ul>
                <div className={styles.sidebar__dropdown}>
                    <h4 className={styles.sidebar__dropdown__heading}>
                        Manager Product
                    </h4>
                    <ul className={styles.sidebar__list}>
                        <li className={route === "product/all-products" ? styles.active : ""} style={{ marginBottom: "6px"}}>
                            <Link href={"/admin/dashboard/product/all-products"}>
                                <BsListUl style={{ width: "21px", height: "21px" }}/>
                                <span className={styles.item__link}>All Products</span>
                            </Link>
                        </li>
                        <li className={route === "product/create-product" ? styles.active : ""} style={{ marginBottom: "6px"}}>
                            <Link href={"/admin/dashboard/product/create-product"}>
                                <BsPlusCircle style={{ width: "21px", height: "21px" }}/>
                                <span className={styles.item__link}>Create Products</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.sidebar__dropdown}>
                    <h4 className={styles.sidebar__dropdown__heading}>
                        Manager Categories
                    </h4>
                    <ul className={styles.sidebar__list}>
                        <li className={route === "categories" ? styles.active : ""} style={{ marginBottom: "6px"}}>
                            <Link href={"/admin/dashboard/categories"}>
                                <BsListUl style={{ width: "21px", height: "21px" }}/>
                                <span className={styles.item__link}>All Categories</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.sidebar__dropdown}>
                    <h4 className={styles.sidebar__dropdown__heading}>
                        Manager Sub-Categories
                    </h4>
                    <ul className={styles.sidebar__list}>
                        <li className={route === "subCategories" ? styles.active : ""} style={{ marginBottom: "6px"}}>
                            <Link href={"/admin/dashboard/sub-categories"}>
                                <BsListUl style={{ width: "21px", height: "21px" }}/>
                                <span className={styles.item__link}>All Sub-Categories</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.sidebar__dropdown}>
                    <h4 className={styles.sidebar__dropdown__heading}>
                        Manager Coupons
                    </h4>
                    <ul className={styles.sidebar__list}>
                        <li className={route === "coupons" ? styles.active : ""} style={{ marginBottom: "6px"}}>
                            <Link href={"/admin/dashboard/coupons"}>
                                <BsListUl style={{ width: "21px", height: "21px" }}/>
                                <span className={styles.item__link}>All Coupons</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <nav>
                    <ul className={`${styles.sidebar__list} ${expand ? styles.nav__flex : ""}`}>
                        <li className={styles.nav__item}>
                            <Link href={""}>
                                <span>
                                    <IoIosSettings/>
                                </span>
                            </Link>
                        </li> 
                        <li className={styles.nav__item}>
                            <Link href={""}>
                                <span>
                                    <MdOutlineNotificationsNone/>
                                </span>
                            </Link>
                        </li> 
                        <li className={styles.nav__item}>
                            <Link href={""}>
                                <span>
                                    <AiOutlineMessage/>
                                </span>
                            </Link>
                        </li> 
                        <li className={styles.nav__item}>
                            <Link href={""}>
                                <span>
                                    <IoMdLogOut/>
                                </span>
                            </Link>
                        </li> 
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default SideBar;