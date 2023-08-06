import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';
import { AiOutlineCamera, AiFillDelete } from "react-icons/ai";

const ImagesReview = ({ images_review, setImages_review}) => {

    const inputFileRef = useRef(null);
    const [error, setError] = useState("");

    const handleChangeImages = async(e) => {
        let files = Array.from(e.target.files);
        files.forEach((image, index) => {
            if(images_review.length == 5 || index == 4) {
                setError("Vui lòng không upload quá 5 hình ảnh!");
                files = files.filter((item) => item.name !== image.name);
                return;
            }
            if(
                image.type !== "image/png" &&
                image.type !== "image/jpg" &&
                image.type !== "image/jpeg" &&
                image.type !== "image/webp"
            ) {
                setError(`${image.name} định dạng file này không được hổ trợ, (chỉ cho phép các file .png, .jpg, .jpeg, .webp)!`);
                files = files.filter((item) => item.name !== image.name);
                return;
            }
            else if(image.size > 1024*1024*4) {
                setError(`${image.name} kích thước hình ảnh quá lớn (tối đa 4MB mỗi hình ảnh)!`);
                files = files.filter((item) => item.name !== image.name);
                return;
            }
            else {
                setError("");
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = (e) => {
                    setImages_review((images_review) => [...images_review, e.target.result]);
                }
            }
        })
    };

    const removeImage = (image) => {
        setImages_review((images_review) => images_review.filter((img) => img !== image));
        if(images_review.length <= 5) {
            setError("");
        }
    }


    return (
        <div className={styles.reviews__images}>
            <input 
                type="file" 
                hidden 
                ref={inputFileRef}
                onChange={handleChangeImages}
                multiple
                accept="image/png,image/jpg,image/jpeg,image/webp"
            />
            <button
                type='button'
                className={styles.reviews__btn__upload}
                onClick={() => inputFileRef.current.click()}
            >
                <AiOutlineCamera size={26}/>
                <span>Chèn hình ảnh</span>   
            </button>
            {
                error && <span className={styles.message__error} style={{ display: "inline-block", margin: "16px 0px 0px"}}>
                    {error}
                </span>
            }
            <div className={styles.reviews__images__wrapper}>
                {
                    images_review.length > 0 &&
                        images_review.map((img, index) => (
                            <div key={index}>
                                <button onClick={() => removeImage(img)}>
                                    <AiFillDelete/>
                                </button>
                                <img src={img} alt="" />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default ImagesReview