import React, { useState } from 'react';
import styles from './styles.module.scss';
import {HiOutlineChevronDown} from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';

const TableSelect = ({ subText, property, text, data, handleChange }) => {

    const [visible, setVisible] = useState(false);

    return (
        <div className={styles.table__select}>
            <span>{subText}:</span>
            <div 
                className={styles.table__select__header}
                onMouseOver={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                style={{
                    background: `${text === "Style" && property.color && property.color === "Tất cả" ? "transparent" : `${property.color}`}`
                }}
            >
                <span 
                    className={styles.flex} 
                    style={{ padding: "0 6px"}}>
                    { 
                        text === "Rating" || text === "Size" ? property || `Chọn ${text}` :
                        text === "Style" && property.image ? (<img src={property.image} alt={property.image}/>) 
                        : ("Chọn Style")
                    }
                    <HiOutlineChevronDown size={17}/>
                </span>
                { visible && (
                    <ul className={styles.table__select__menu}>
                        { data.map((item, index) => {
                            if(text === "Rating") {
                                return  (
                                    <li 
                                        key={index}
                                        onClick={() => handleChange(item.value)}
                                    >
                                        <span style={{ 
                                            display: "flex", 
                                            alignItems: "center", 
                                            fontSize: "14px", 
                                            fontStyle: "italic",
                                            fontWeight: "600",
                                            color: "#777",
                                            textTransform: "capitalize"
                                        }}>
                                            <span>{item.text}</span>
                                            {item.text !== "Tất cả" && <AiFillStar size={18} style={{ marginTop: "-2px", fill: "#fbc531"}}/>}
                                        </span>
                                    </li>
                                )
                            }
                            else if(text === "Size") {
                                return  (
                                    <li 
                                        key={index}
                                        onClick={() => handleChange(item.size)}
                                    >
                                        <span>{item.size === "Tất cả" ? item.size : `Size ${item.size}`}</span>
                                    </li>
                                )
                            }
                            else if(text === "Style") {
                                return  (
                                    <li 
                                        key={index}
                                        onClick={() => handleChange(item)}
                                        style={{ backgroundColor: `${item.color}`}}
                                    >
                                        <span>
                                            {item.color === "Tất cả" ? "Tất cả" : <img src={item.image} alt={item.image} />}
                                        </span>
                                    </li>
                                )
                            }
                            else if(text === "Arrangement") {
                                return  (
                                    <li 
                                        key={index}
                                        onClick={() => handleChange(item.text)}
                                    >
                                        <span>{item.text}</span>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default TableSelect;