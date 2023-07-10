import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { FaRegAddressCard } from "react-icons/fa";
import { BsBoxSeam, BsBell, BsHouseDown, BsHeart } from "react-icons/bs";
import { signOut, signIn } from "next-auth/react"

const AccountDropdown = ({ session }) => {
    return (
        <div className={styles.dropdownMenu}>
            <h4>Welcome to StorePay !</h4>
            { session ? (
                    <div className={styles.flex}>
                        <img 
                            src={session?.user?.image} 
                            alt={session?.user?.image} 
                            className={styles.flex__img}
                        />
                        <div className={styles.flex__info}>
                            <h5>{session?.user?.name}</h5>
                            <span onClick={() => signOut()}>Log out</span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.flex}>
                        <button className={styles.btn_primary}>Register</button>
                        <button 
                            className={styles.btn_primary_outline}
                            onClick={() => signIn()}
                        >
                            Sign in
                        </button>
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