import React from 'react';
import styles from './styles.module.scss';
import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";

const ProductShares = () => {
    return (
        <div className={styles.shares}>
            <FacebookShareButton url={window?.location.href}>
                <FacebookIcon size={40}/>
            </FacebookShareButton>
            <FacebookMessengerShareButton url={window?.location.href}>
                <FacebookMessengerIcon size={40}/>
            </FacebookMessengerShareButton>
            <TwitterShareButton url={window?.location.href}>
                <TwitterIcon size={40}/>
            </TwitterShareButton>
        </div>
    )
}

export default ProductShares