import React, { useState } from 'react';
import styles from './styles.module.scss';
import {HiOutlineChevronDown} from 'react-icons/hi';

const Select = ({ subText, property, text, data, handleChange }) => {

    const [visible, setVisible] = useState(false);

    return (
        <div className={styles.select}>
            <span>{subText}:</span>
            <div 
                className={styles.select__header}
                onMouseOver={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                style={{
                    background: `${text === "Style" && property.color && `${property.color}`}`
                }}
            >
                <span 
                    className={styles.flex} 
                    style={{ padding: "0 6px"}}>
                    { 
                        text === "Size" ? property || `Chọn ${text}` :
                        text === "Style" && property.image ? 
                            (<img src={property.image} alt={property.image}/>) 
                        : text === "Material" && property ? 
                            property 
                            : !property && text === "Material" ? (
                                "Chất liệu"
                            ) :("Chọn Style")
                    }
                    <HiOutlineChevronDown size={17}/>
                </span>
                { visible && (
                    <ul className={styles.select__menu}>
                        { data.map((item, index) => {
                            if(text === "Size") {
                                return  (
                                    <li 
                                        key={index}
                                        onClick={() => handleChange(item.size)}
                                    >
                                        <span>Size {item.size}</span>
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
                                            <img src={item.image} alt={item.image} />
                                        </span>
                                    </li>
                                )
                            }
                            else if(text === "Material") {
                                return  (
                                    <li 
                                        key={index}
                                        onClick={() => handleChange(item)}
                                    >
                                        <span>{item}</span>
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

export default Select;