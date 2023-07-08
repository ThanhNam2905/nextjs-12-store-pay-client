import React from 'react';
import styles from './styles.module.scss';
import { BsFacebook, BsMessenger, BsInstagram, BsTwitter } from "react-icons/bs";
import { SiShopee } from "react-icons/si";

const SocialsLink = () => {
    return (
        <div className={styles.footer__socials}>
            <section>
                <h3>Stay Connected</h3>
                <ul>
                    <li title='Facebook'>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <BsFacebook/>
                        </a>
                    </li>
                    <li title='Messenger'>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <BsMessenger/>
                        </a>
                    </li>
                    <li title='Shopee'>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <SiShopee/>
                        </a>
                    </li>
                    <li title='Instagram'>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <BsInstagram/>
                        </a>
                    </li>
                    <li title='Twitter'>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <BsTwitter/>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default SocialsLink;