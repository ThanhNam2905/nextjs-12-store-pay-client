import { ErrorMessage, useField } from 'formik'
import styles from './styles.module.scss'
import { MenuItem, TextField } from '@mui/material';

export const SingularSelect = ({
    placeholder,
    handleChange,
    data,
    disabled,
    ...rest
}) => {

    const [field, meta] = useField(rest);

    return (
        <div style={{ marginBottom: "1rem"}}>
            <TextField
                variant='outlined'
                name={field.name}
                value={field.value || ""}
                select
                label={placeholder}
                onChange={handleChange}
                className={`${styles.select} ${meta.touched && meta.error && styles.error__select}`}
                disabled={disabled}
            >
                
                {
                    data ? data.map((option) => (
                            <MenuItem 
                                key={option._id}
                                value={option.name_with_type || option._id}
                            >
                                {option.name_with_type || option.name}
                            </MenuItem>
                        )) : (
                            <MenuItem key={""} value={""}>
                                No Selected / Or Empty
                            </MenuItem>
                        )
                    
                }
            </TextField>
            {
                meta.touched && meta.error &&
                <p className={styles.error__msg}>
                    <ErrorMessage name={field.name}/>
                </p>
            }
        </div>
    )
}
