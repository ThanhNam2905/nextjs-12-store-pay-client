import React from 'react'
import { BiSolidRightArrowAlt } from 'react-icons/bi';
import styles from './styles.module.scss';

const CircleIConButton = ({ type, text, icon }) => {
    return (
        <button type={type} className={styles.button}>
            <span>{text}</span>
            <div className={styles.icon__svg}>
                <BiSolidRightArrowAlt/>
            </div>
        </button>
    )
}

export default CircleIConButton;