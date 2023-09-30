import React, { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import styles from "./styles.module.scss";
import { useField, ErrorMessage } from "formik";
import { Box, Checkbox, Chip, FormControl, InputLabel, ListItemText, OutlinedInput, Select } from "@mui/material";

export default function MultipleSelect({
    data,
    handleChange,
    value,
    header,
    disabled,
    ...rest
}) {
    const [subs, setSubs] = useState(data || []);
    const [field, meta] = useField(rest);
    useEffect(() => {
        setSubs(data);
    }, [data]);
    const result = data.length
        ? data.reduce((obj, cur) => ({ ...obj, [cur._id]: cur.name }), {})
        : {}
    ;

    return (
        <div>
            { header && (
                <div className={styles.header}>
                    <p>
                        {header}
                        <span>*</span>
                    </p>
                </div>
            )}
            
            <FormControl sx={{ width: "100%", marginBottom: 3 }}>
                <InputLabel id="demo-multiple-chip-label" style={{ textTransform: "capitalize"}}>danh muc phụ</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={field.value}
                    onChange={handleChange}
                    name={field.name}
                    disabled={disabled}
                    input={<OutlinedInput id="select-multiple-chip" label="danh muc phụ"/>}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={result[value]} />
                            ))}
                        </Box>
                    )}
                >
                    { result &&
                        Object.keys(result).map((id) => {
                            return (
                                <MenuItem key={id} value={id}>
                                    <Checkbox checked={value.indexOf(id) > -1} />
                                    <ListItemText primary={result[id]} />
                                </MenuItem>
                            );
                        })}
                </Select>
                { 
                    meta.touched && meta.error && (
                        <div className={styles.error__msg}>
                            <ErrorMessage name={field.name} />
                        </div>
                    )
                }
            </FormControl>
        </div>
    );
}
