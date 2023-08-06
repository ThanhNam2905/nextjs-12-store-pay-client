import React from 'react';
import styles from './styles.module.scss';
import { Rating } from '@mui/material';
import { AiOutlineLike } from 'react-icons/ai';

const ReviewCard = ({ review }) => {

    const { username, image } = review.reviewBy;

    return (
        <div className={styles.review}>
            <div className={styles.flex}>
                <div className={styles.review__user}>
                    <img src={image} alt="" />
                </div>
                <div className={styles.review__content}>
                    <h4>{username}</h4>
                    <div className={styles.review__content__rating}>
                        <Rating
                            name="half-rating-read"
                            value={review.rating}
                            readOnly
                            style={{ color: "#fbc531", fontSize: "1.2rem"}}
                        />
                        <p>
                            {review.updatedAt && review.updatedAt.slice(0, 10)}
                        </p>
                    </div>
                    <div>
                        <p>
                            Chất liệu: &nbsp;
                            <span>{review.material}</span>
                        </p>
                        <p>
                            Size: &nbsp;
                            <span>{review.size}</span>
                        </p>
                        <div className={styles.review__content__img}>
                            Màu sắc: 
                            <img src={review.style.image} alt="" />
                        </div>
                    </div>
                    <p className={styles.review__content__paragraph}>{review.review}</p>

                    <div className={styles.review__images}>
                        { review.images.length > 0 &&
                            review.images.map((img, index) => (
                                <img src={img.url} alt="" key={index} />
                            ))
                        }
                    </div>
                    <div className={styles.review__extra}>
                        <div className={styles.review__extra__likes}>
                            <AiOutlineLike/>
                            {review.likes ? review.likes?.likes : (<span>Hữu ích ?</span>) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard;