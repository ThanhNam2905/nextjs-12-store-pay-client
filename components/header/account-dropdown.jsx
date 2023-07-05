import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { FaRegAddressCard } from "react-icons/fa";
import { BsBoxSeam, BsBell, BsHouseDown, BsHeart } from "react-icons/bs";

const AccountDropdown = ({ isLoggIn }) => {
    return (
        <div className={styles.dropdownMenu}>
            <h4>Welcome to StorePay !</h4>
            { isLoggIn ? (
                    <div className={styles.flex}>
                        <img 
                            src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" 
                            alt="avatar user" 
                            className={styles.flex__img}
                        />
                        <div className={styles.flex__info}>
                            <h5>Thanh Nam</h5>
                            <span>Log out</span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.flex}>
                        <button className={styles.btn_primary}>Register</button>
                        <button className={styles.btn_primary_outline}>Login</button>
                    </div>
                )
            }
            <ul className={styles.dropdownMenu__list}>
                <li>
                    <Link href={"/profile"}>
                        <FaRegAddressCard
                            style={{
                                width: '18px',
                                height: '18px',
                            }}
                        />
                        Profile Account
                    </Link>
                </li>
                <li>
                    <Link href={"/profile/orders"}>
                        <BsBoxSeam
                            style={{
                                width: '18px',
                                height: '18px',
                            }}
                        />
                        My Orders
                    </Link>
                </li>
                <li>
                    <Link href={"/profile/notifications"}>
                        <BsBell
                            style={{
                                width: '18px',
                                height: '18px',
                            }}
                        />
                        My Notifications
                    </Link>
                </li>
                <li>
                    <Link href={"/profile/addres"}>
                        <BsHouseDown
                            style={{
                                width: '18px',
                                height: '18px',
                            }}
                        />
                        My Address
                    </Link>
                </li>
                <li>
                    <Link href={"/profile/whishlist"}>
                        <BsHeart
                            style={{
                                width: '18px',
                                height: '18px',
                            }}
                        />
                        Whishlist
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AccountDropdown