import React from 'react';
import styles from './styles.module.scss';
import Rating from '@mui/material/Rating';
import { useSession, signIn} from 'next-auth/react';
import AddReview from './add-review';
import Table from './table';

const ProductReviews = ({ product }) => {

    const { data: session } = useSession();

    return (
        <div className={styles.reviews}>
            <div className={styles.reviews__container}>
                <h2>Đánh giá sản phẩm ({product.numReviews})</h2>
                <div className={styles.reviews__stars}>
                    <div className={styles.reviews__stars__overview}>
                        <span>Đánh giá trung bình</span>
                        <div className={styles.reviews__stars__overview__rating}>
                            <Rating
                                name="half-rating-read"
                                defaultValue={product.rating}
                                readOnly
                                precision={0.5}
                                style={{ color: "#fbc531"}}
                            />
                            { product.rating === 0 ? "Không có đánh giá" : product.rating }
                        </div>
                    </div>
                    <div className={styles.reviews__stars__lists}>
                        { product.ratings.map((rating, index) => (
                            <div 
                                className={styles.reviews__stars__items}
                                key={index}
                            >
                                <Rating
                                    name="half-rating-read"
                                    defaultValue={5 - index}
                                    readOnly
                                    precision={1}
                                    style={{ color: "#fbc531"}}
                                />
                                <div className={styles.progessBar}>
                                    <div className={styles.progessBar__inner} style={{ width: `${rating.percentage}%`}}>
                                    </div>
                                </div>
                                <span className={styles.percentage}>
                                    {rating.percentage} %
                                </span>
                            </div> 
                            ))
                        }
                    </div>
                </div>
                {
                    session ? (
                        <div>
                            <AddReview product={product}/>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className={styles.reviews__btn}
                        >
                            Đăng nhập để thêm nhận xét
                        </button>
                    )
                }
                <Table 
                    reviews={product.reviews} 
                    allSizes={[{size: "Tất cả"}, ...product.allSizes]}
                    colors={[{color: "Tất cả", image: ""},...product.colors]}
                />
            </div>
        </div>
    )
}

export default ProductReviews