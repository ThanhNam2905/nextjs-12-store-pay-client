import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { BiSolidChevronRight } from "react-icons/bi";

const QuickLinks = () => {
    return (
        <div className={styles.footer__links}>
            {
                links.map((link, index) => (
                    <ul key={index}>
                        {
                            index === 0 ? (
                                <Link 
                                    href={"/"}
                                    className={styles.footer__logo}
                                >
                                    <img src="./../../images/logo.png" alt="logo website" />
                                </Link>
                            ) : (
                                <b>{link.heading}</b>
                            )
                        }
                        
                        {
                            link.links.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.linkURL}>
                                        <BiSolidChevronRight/>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                ))
            }
        </div>
    )
}

export default QuickLinks;

const links = [
    {
        heading: "SHOPPAY",
        links: [
            {
                name: "About us",
                linkURL: "",
            },
            {
                name: "Contact us",
                linkURL: "",
            },
            {
                name: "Social Responsibility",
                linkURL: "",
            },
        ],
    },
    {
        heading: "Help & support",
        links: [
            {
                name: "Shipping Info",
                linkURL: "",
            },
            {
                name: "Returns",
                linkURL: "",
            },
            {
                name: "How To Order",
                linkURL: "",
            },
            {
                name: "How To Track",
                linkURL: "",
            },
            {
                name: "Size Guide",
                linkURL: "",
            },
        ],
    },
    {
        heading: "Customer service",
        links: [
            {
                name: "Customer service",
                linkURL: "",
            },
            {
                name: "Terms and Conditions",
                linkURL: "",
            },
            {
                name: "Consumers (Transactions)",
                linkURL: "",
            },
            {
                name: "Take our feedback survey",
                linkURL: "",
            },
        ],
    },
];