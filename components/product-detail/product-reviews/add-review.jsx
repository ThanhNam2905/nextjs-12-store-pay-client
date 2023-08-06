import React, { useState } from 'react';
import styles from './styles.module.scss';
import Select from './select';
import { Rating } from '@mui/material';
import ImagesReview from './images-review';

const materials = ["Không tốt", "Chuẩn", "Tốt"];

const AddReview = ({ product }) => {

    const [size, setSize] = useState("");
    const [style, setStyle] = useState("");
    const [material, setMaterial] = useState("");
    const [content_review, setContent_review] = useState("");
    const [rating, setRating] = useState(0);
    const [images_review, setImages_review] = useState([]);

    return (
        <div className={styles.reviews__add}>
            <div className={styles.reviews__add__wrapper}>
                <div className={styles.flex} style={{ gap: "20px"}}>
                    <Select 
                        subText="Kích thước"
                        property={size === "" ? "Chọn Size" : `Size: ${size}`}
                        text="Size"
                        data={product.allSizes.filter((x) => x.size !== size)}
                        handleChange={setSize}
                    />
                    <Select 
                        subText="Kiểu dáng"
                        property={style}
                        text="Style"
                        data={product.colors.filter((x) => x !== style)}
                        handleChange={setStyle}
                    />
                    <Select 
                        subText="Chất liệu"
                        property={material}
                        text="Material"
                        data={materials.filter((x) => x !== material)}
                        handleChange={setMaterial}
                    />
                </div>
                <ImagesReview
                    images_review={images_review}
                    setImages_review={setImages_review}
                />
                <Rating
                    name="half-rating"
                    defaultValue={0}
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    precision={1}
                    style={{ color: "#fbc531", fontSize: "2.5rem"}}
                />
                <textarea 
                    name="content_review"
                    value={content_review}
                    onChange={(e) => setContent_review(e.target.value)}
                    placeholder='Viết đánh giá của bạn ở đây...'
                >
                </textarea>
                
                <button
                    type='submit'
                    className={styles.reviews__btn}
                >
                    Xác nhận đánh giá
                </button>
            </div>
        </div>
    )
}

export default AddReview;