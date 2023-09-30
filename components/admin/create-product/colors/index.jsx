/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import styles from './styles.module.scss';
import { ErrorMessage, useField } from 'formik';
import { IoWarningOutline } from 'react-icons/io5';
import { ColorExtractor } from 'react-color-extractor';
import { BsArrowUpCircle } from 'react-icons/bs';
import { TbColorFilter } from 'react-icons/tb';
import { Alert } from '@mui/material';

export const Colors = ({
    header,
    product,
    images,
    setProduct,
    colorImage,
    ...props
}) => {

    const [toggle, setToggle] = useState(false);
    const [colors, setColors] = useState([]);

    const [field, meta] = useField(props);
    const renderSwatches = () => {
        return (
            <div style={{ padding: "0.4rem 0" }}>
                { colors.map((color, id) => (
                        <div 
                            key={id}
                            className={styles.square__color} 
                            style={{ backgroundColor: color}}
                            onClick={() => {
                                setProduct({
                                    ...product,
                                    color: {
                                        color,
                                        image: product.color.image,
                                    }
                                })
                            }}
                        >
                            {color}
                        </div>
                    ))
                }     
            </div>
        ) 
    };

    return (
        <div className={styles.colors}>
            <div className={styles.heading}>
                <p>
                    {header}
                    <span>*</span>
                </p>
            </div>
            <input 
                type="text"
                name={field.name} 
                value={product.color.color}
                hidden
                {...field}
                {...props}
            />
            <div className={styles.colors__infos}>
                { images.length > 0 ? (
                        <Alert severity="info" sx={{ width: "fit-content", fontSize: "16px", display: "flex", alignItems: "center" }}>
                            Trích xuất màu sắc bằng cách nhấp vào biểu tượng <TbColorFilter size={20} style={{ margin: "0 8px"}}/> hình ảnh sản phẩm
                        </Alert>
                    ) : (
                        <Alert severity={ meta.error ? "error" : "info" } sx={{ width: "fit-content", fontSize: "16px", display: "flex", alignItems: "center" }}>
                            Vui lòng chọn hình ảnh sản phẩm trước!
                        </Alert>
                    )
                }
            </div>
            <div className={toggle ? styles.toggle : ""}>
                <ColorExtractor getColors={(colors) => setColors(colors)}>
                    <img
                        src={colorImage}
                        style={{ display: "none" }}
                    />
                </ColorExtractor>
                { images.length > 0 && (
                        <div className={styles.wheel}>{renderSwatches()}</div>
                    )
                }
            </div>
            {
                colors.length > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "0.6rem" }}>
                        <BsArrowUpCircle
                            className={styles.toggle__btn}
                            onClick={() => setToggle((prev) => !prev)}
                            style={{ transform: `${toggle ? "rotate(180deg)" : ""}`}}
                        />
                        <span style={{ fontSize: "16px"}}>{toggle ? "Mở rộng" : "Thu gọn"}</span>
                    </div>
                )
            }
            <span>
                { meta.touched && meta.error && (
                    <div className={styles.error__msg}>
                        <ErrorMessage name={field.name}/>
                    </div>
                )}
            </span>
        </div>
    );
}
