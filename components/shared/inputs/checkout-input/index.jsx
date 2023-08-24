import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss'
import { useField, ErrorMessage } from 'formik';

export const CheckoutInput = ({ placeholder, ...props }) => {

    const [field, meta] = useField(props);
    const [moveLabel, setMoveLabel] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if(field.value.length > 0) {
            setMoveLabel(true);
        }
        else {
            setMoveLabel(false);
        }
    }, [field.value]);

    return (
        <div className={`${styles.input} ${meta.touched && meta.error && styles.error}`}>
            <div 
                className={styles.input__wrapper}
                onFocus={() => setMoveLabel(true)}
                onBlur={() => setMoveLabel(field.value.length > 0 ? true : false)}
            >
                <input 
                    ref={inputRef}
                    type={field.type} 
                    name={field.name}
                    {...field}
                    {...props}
                />
                <span 
                    className={moveLabel ? styles.move : ""}
                    onClick={() => {
                        inputRef.current.focus();
                        setMoveLabel(true);
                    }}
                >
                    {placeholder}
                </span>
            </div>
            {
                meta.touched && meta.error && 
                <div className={styles.error__validate}>
                    <ErrorMessage name={field.name}/>
                </div>
            }
        </div>
    )
};
