import Link from 'next/link';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoCaretDownOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { IoMdHelp } from "react-icons/io";
import { BsHeart } from "react-icons/bs";
import AccountDropdown from './account-dropdown';

const TopHeader = () => {

    const [isLoggIn, setIsLoggIn] = useState(true);
    const [visibleDropdown, setVisibleDropdown] = useState(false);

    return (
        <>
            <Link href={'/browser'}>
                <div className={styles.banner}></div>
            </Link>
            
            <div className={styles.wrapper}>
                <div className={styles.wrapper__container}>
                    <div></div>
                    <ul className={styles.wrapper__list}>
                        <li>
                            <img 
                                src="https://static.vecteezy.com/system/resources/thumbnails/016/328/942/small_2x/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png" 
                                alt="" 
                            />
                            <span>Vietnamese / VNĐ</span>
                        </li>
                        <li>
                            <RiCustomerServiceLine />
                            <span>Customer services</span>
                        </li>
                        <li>
                            <IoMdHelp />
                            <span>Help</span>
                        </li>
                        <li>
                            <Link href={'/profile/whishlist'}>
                                <BsHeart 
                                    style={{
                                        width: '16px',
                                        height: '16px'
                                }}/>
                                <span>Whishlist</span>
                            </Link>
                        </li>
                        <li
                            onMouseOver={() => setVisibleDropdown(true)} 
                            onMouseLeave={() => setVisibleDropdown(false)}
                        >
                            {
                                isLoggIn ? (
                                    <div className={styles.icon__account}>
                                        <img 
                                            src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" 
                                            alt="avatar user" 
                                            className={styles.icon__account__img}
                                        />
                                        <span>Thanh Nam</span>
                                        <IoCaretDownOutline 
                                            style={{
                                                width: '14px',
                                                height: '14px'
                                        }}/>
                                    </div>
                                ) : (
                                    <div className={styles.icon__account}>
                                        <VscAccount
                                            style={{
                                                width: '18px',
                                                height: '18px',
                                                marginRight: '3px'
                                            }}
                                        />
                                        <span>Account</span>
                                        <IoCaretDownOutline 
                                            style={{
                                                width: '16px',
                                                height: '16px'
                                        }}/>
                                    </div>
                                )
                            }

                            { visibleDropdown && ( <AccountDropdown isLoggIn={isLoggIn}/> )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TopHeader;