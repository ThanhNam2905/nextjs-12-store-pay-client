import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { IoLocationSharp } from "react-icons/io5";

const Copyright = ({ country }) => {
    return (
        <div className={styles.footer__copyright}>
            <h3>&#169;2023 <span>STOREPAY</span> All Rights Resereved.</h3>
            <section>
                <ul>
                    {
                        data.map((item, index) => (
                            <li key={index}>
                                <Link href={item.linkURL}>
                                    {item.name}
                                </Link>
                            </li>
                        ))
                    }
                    <li>
                        <IoLocationSharp/>
                        <span>{country.name}</span>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default Copyright;

const data = [
    {
      name: "Privacy Center",
      linkURL: "",
    },
    {
      name: "Privacy & Cookie Policy",
      linkURL: "",
    },
    {
      name: "Manage Cookies",
      linkURL: "",
    },
    {
      name: "Terms & Conditions",
      linkURL: "",
    },
    {
      name: "Copyright Notice",
      linkURL: "",
    },
];