import Link from 'next/link';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoCaretDownOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { IoMdHelp } from "react-icons/io";
import { BsHeart } from "react-icons/bs";
import AccountDropdown from './account-dropdown';
import { useSession } from 'next-auth/react';

const TopHeader = ({ country }) => {

    const { data: session } = useSession();
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
                                src={country.flag}
                                alt={country.flag} 
                            />
                            <span>{country.name} / VNĐ</span>
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
                                session ? (
                                    <div className={styles.icon__account}>
                                        <img 
                                            src={session?.user?.image} 
                                            alt={session?.user?.image} 
                                            className={styles.icon__account__img}
                                        />
                                        <span>{session?.user?.username}</span>
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

                            { visibleDropdown && ( <AccountDropdown session={session}/> )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TopHeader;