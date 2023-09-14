import { ErrorMessage, useField } from 'formik';
import styles from './styles.module.scss'

const AdminInput = ({ placeholder, label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <div>
            <label
                className={`${styles.label} ${meta.touched && meta.error ? styles.inputError : ""}`}
            >
                <p>
                    {label}
                    <span>*</span>
                </p>
                <input 
                    type={field.type} 
                    name={field.name}
                    value={field.value || ""}
                    placeholder={placeholder}
                    {...field}
                    {...props}
                />
            </label>
            {
                meta.touched && meta.error && (
                    <div className={styles.inputError__msg}>
                        <span></span>
                        <ErrorMessage name={field.name}/>
                    </div>
                )
            }
        </div>
    )
}

export default AdminInput;