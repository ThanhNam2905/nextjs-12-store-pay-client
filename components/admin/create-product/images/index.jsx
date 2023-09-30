import { useDispatch } from 'react-redux';
import styles from './styles.module.scss'
import { useRef } from 'react';
import { ErrorMessage, useField } from 'formik';
import { PiWarningCircle } from 'react-icons/pi';
import { showDialog } from '../../../../store/dialogSlice';
import { RiDeleteBin7Line, RiShape2Line } from 'react-icons/ri'
import { AiFillPicture } from 'react-icons/ai';
import { TbColorFilter } from 'react-icons/tb';

export const Images = ({
    images, 
    setImages,
    header, 
    textBtn, 
    setColorImage,
    ...props
}) => {

    const dispatch = useDispatch();
    const fileInput = useRef(null);
    const [meta, field] = useField(props);
    
    // Handler Change Images in Input Files.
    const handleChangeImages = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((img, index) => {
            if(images.length > 7) {
                dispatch(
                    showDialog({
                        header: "Số lượng file vượt quá tối đa!",
                        msgs: [
                            {
                                msg: "Tổng số lượng files không được vượt quá tối đa 7 file",
                                type: "error",
                            },
                        ],
                    })
                );
                return;
            }
            else if(img.type !== "image/jpeg" &&
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
                    setImages((images) => [...images, e.target.result]);
                }
            }
        })
    };

    const handleRemoveImage = (image) => {
        setImages((images) => images.filter((item) => item !== image));
    };

    return (
        <div className={styles.images}>
            <div className={`${styles.heading} ${meta.error ? styles.header__error : ""}`}>
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
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleChangeImages}
            />
            <div className={styles.images__list}>
                { 
                    images.length > 0  && (
                        <div className={`${styles.images__list__grid} 
                            ${images.length === 2 ? styles.grid__two :
                                images.length === 3 ? styles.grid__three : 
                                images.length === 4 ? styles.grid__four : 
                                images.length === 5 ? styles.grid__five : 
                                images.length === 6 ? styles.grid__six : 
                                images.length === 7 ? styles.grid__seven : ""
                            }
                            `}
                        >
                           {
                                images.map((img, index) => (
                                    <div className={styles.images__list__grid__wrap} key={index}>
                                        <div className={styles.blur}></div>
                                        <img src={img} alt="" />
                                        <div className={styles.actions}>
                                            <button onClick={() => handleRemoveImage(img)}>
                                                <RiDeleteBin7Line/>
                                            </button>
                                            <button onClick={() => setColorImage(img)}>
                                                <TbColorFilter style={{ stroke: "#666", fill: "transparent"}}/>
                                            </button>
                                            <button>
                                                <RiShape2Line/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                           }
                        </div>
                    )
                }
            </div>
            <button
                type='reset'
                disabled={images.length === 7}
                style={{ opacity: `${images.length === 7 && "0.5"}`, margin: "0.8rem 0 1rem"}}
                className={styles.btn__upload__img}
                onClick={() => fileInput.current.click()}
            >
                <AiFillPicture/>
                {textBtn}
            </button>
        </div>
    )
};
