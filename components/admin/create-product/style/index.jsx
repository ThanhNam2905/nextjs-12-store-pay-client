import { useDispatch } from 'react-redux';
import styles from './styles.module.scss'
import { useRef } from 'react';
import { ErrorMessage, useField } from 'formik';
import { PiWarningCircle } from 'react-icons/pi';
import { showDialog } from '../../../../store/dialogSlice';
import { RiDeleteBin7Line, RiShape2Line } from 'react-icons/ri'
import { GiExtractionOrb } from "react-icons/gi";
import { AiFillPicture } from 'react-icons/ai';

export const Style = ({
    product, 
    setProduct,
    header,  
    colorImage,
    textBtn,
    ...props
}) => {

    const dispatch = useDispatch();
    const fileInput = useRef(null);
    const [meta, field] = useField(props);
    
    // Handler Change Image Style in Input Files.
    const handleChangeImage = (e) => {
        let img = e.target.files[0];
        if(img.type !== "image/jpeg" &&
            img.type !== "image/jpg" &&
            img.type !== "image/png" &&
            img.type !== "image/webp"
        ) {
            dispatch(
                showDialog({
                    header: "Định dạng file không đúng!",
                    msgs: [
                        {
                            msg: `File ${img.name} có định dạng của file không đúng, chỉ chấp nhận các file JPEG, JPG, PNG and WEBP`,
                            type: "error",
                        },
                    ],
            }));
            files = files.filter((item) => item !== img.name);
            return;
        }
        else if(img.size > 1024*1024*5) {
            dispatch(
                showDialog({
                    header: "kích thước file quá lớn!",
                    msgs: [
                        {
                            msg: `File ${img.name} có kích thước quá lớn, vượt quá tối đa 5MB cho phép`,
                            type: "error",
                        },
                    ],
            }));
            return;
        }
        else {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (e) => {
                let obj = {
                    color: product.color.color,
                    image: e.target.result,
                }
                setProduct({
                    ...product,
                    color: obj,
                });
            }
        }
    };

    return (
        <div className={styles.style}>
            <div className={`${styles.heading} ${meta.error ? styles.header__error : ""}`} style={{ border: "none"}}>
                <div className={styles.flex}>
                    { meta.error && (
                        <PiWarningCircle size={25} style={{ fill: "orange"}}/>
                    )}
                    <p>
                        {header}
                        <span>*</span>
                    </p>
                    
                </div>
                <span>
                    { meta.touched && meta.error && (
                        <div className={styles.error__msg}>
                            <ErrorMessage name={name}/>
                        </div>
                    )}
                </span>
            </div>
            <input 
                type="file" 
                name={field.name} 
                ref={fileInput}
                hidden
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleChangeImage}
            />
            { !product.color.image ? (
                    <button
                        type='reset'
                        className={styles.btn__upload__img}
                        onClick={() => fileInput.current.click()}
                    >
                        <AiFillPicture/>
                        {textBtn}
                    </button>
                ) : ""
            }
        </div>
    )
};
