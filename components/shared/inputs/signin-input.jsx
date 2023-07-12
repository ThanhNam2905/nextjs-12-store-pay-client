import React from 'react'
import styles from './styles.module.scss';
import { BiUser } from 'react-icons/bi';
import { LuMail } from "react-icons/lu";
import { HiOutlineKey } from "react-icons/hi";
import { ErrorMessage, useField } from 'formik';

const SigninInput = ({icon, placeholder, ...props}) => {

    const [field, meta] = useField(props);

    return (
        <div className={`${styles.input} ${meta.touched && meta.error ? styles.error__input : ""}`}>
            {
                icon === 'user' ? <BiUser style={{ fill: '#888'}}/> 
                    : icon === 'email' ? <LuMail/> 
                        : icon === 'password' ? <HiOutlineKey/> : ""
            }
            <input 
                type={field.type}
                name={field.name}
                placeholder={placeholder} 
                {...field}
                {...props}
            />
            {
                meta.touched && meta.error && 
                    <div className={styles.error__message}>
                        <ErrorMessage name={field.name}/>
                    </div>
            }
        </div>
    )
}

export default SigninInput;

