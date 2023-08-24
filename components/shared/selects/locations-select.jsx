import { ErrorMessage, useField } from 'formik'
import styles from './styles.module.scss'
import { FormControl, MenuItem, TextField } from '@mui/material';

export const LocationsSelect = ({
    placeholder,
    handleChange,
    data,
    disabled,
    ...rest
}) => {

    const [field, meta] = useField(rest);

    

    return (
        <FormControl sx={{ width: 1 }}>
            <TextField
                variant='outlined'
                name={field.name}
                value={field.value}
                select
                label={placeholder}
                onChange={handleChange}
                className={`${styles.select} ${meta.touched && meta.error && styles.error__select}`}
                disabled={disabled}
            >
                {
                    data && 
                        data.map((option) => (
                            <MenuItem 
                                key={option._id}
                                value={option.name_with_type}
                            >
                                {option.name_with_type}
                            </MenuItem>
                        ))
                }
            </TextField>
            {
                meta.touched && meta.error &&
                <div className={styles.error__msg}>
                    <ErrorMessage name={field.name}/>
                </div>
            }
        </FormControl>
    )
}
