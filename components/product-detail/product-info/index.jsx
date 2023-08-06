import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Rating } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LuMinus, LuPlus } from "react-icons/lu";
import { BsHandbag, BsHeart } from 'react-icons/bs';
import ProductShares from './product-shares';
import ProductDetails from './product-details';

const ProductInfo = ({ product, setActiveImage }) => {

    const router = useRouter();
    const [size, setSize] = useState(router.query.size);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        setQty(1);
        setSize("");
    }, [router.query.style]);

    useEffect(() => {
        if(qty > product.quantity) {
            setQty(product.quantity);
        }
    }, [product.quantity, qty, router.query.size]);

    return (
        <div className={styles.infos}>
            <div className={styles.infos__container}>
                <h2 className={styles.infos__name}>{product.name}</h2>
                <h5 className={styles.infos__sku}>{product.sku}</h5>
                <div className={styles.infos__rating}>
                    <Rating
                        name="half-rating-read"
                        defaultValue={product.rating}
                        readOnly
                        precision={0.5}
                        style={{ color: "#fbc531"}}
                    />
                    <p>({product.numReviews} nhận xét)</p>
                </div>
                <div className={styles.infos__price}>
                    { !size ? (
                            <p>({product.pricesRange})</p>
                        ) : (
                            <p>{product.price}$</p>
                        )
                    }
                    { size ? (
                            <div>
                                <span>{product.priceBefore}$</span>
                                <span>{product.discount}% giảm</span>
                            </div>
                        ): ""
                    }
                </div>
                <div className={styles.infos__shipping}>
                    { product.shipping ? (
                            <span>{`+ ${product.shipping}$ phí giao hàng`}</span>
                        ) : (
                            <span>Miễn phí vận chuyễn</span>
                        )
                    }
                </div>
                <div className={styles.infos__pieces}>
                    <span>Hiện có </span>
                    { size ? 
                        (product.quantity) 
                        : (
                            product.sizes.reduce((start, next) => start + next.qty, 0)
                        )
                    }
                    <span> sản phẩm có sẵn</span>
                </div>
                <div className={styles.infos__colors}>
                    <h4>Chọn Màu:</h4>
                    <div className={styles.infos__colors__wrapper}>
                        { product.colors && product.colors.map((color, index) => (
                                <span 
                                    key={index}
                                    className={`${styles.infos__colors__item} ${index == router.query.style && styles.active__color}`}
                                    onClick={() => setActiveImage(product.subProducts[index].images[0].url)}
                                >
                                    <Link href={`/product/${product.slug}?style=${index}`}>
                                        <img 
                                            src={color.image} 
                                            alt={color.image} 
                                            />
                                            
                                    </Link>
                                    
                                </span>
                                
                            ))
                        }
                    </div>
                </div>
                <div className={styles.infos__sizes}>
                    <h4>Chọn Size:</h4>
                    <div className={styles.infos__sizes__wrapper}>
                        { product.sizes && product.sizes.map((size, index) => (
                                <Link
                                    key={index}
                                    href={`/product/${product.slug}?style=${router.query.style}&size=${index}`}    
                                >
                                    <div 
                                        className={`${styles.infos__sizes__item} ${index == router.query.size && styles.active__size}`}
                                        onClick={() => setSize(size.size)}
                                    >
                                        {size.size}
                                    </div>
                                </Link>
                            ))

                        }
                    </div>
                </div>
                <div className={styles.infos__qty}>
                    <h4>Chọn Size:</h4>
                    <div className={styles.infos__qty__wrapper}>
                        <button
                            onClick={() => qty > 1 && setQty((prev) => prev - 1)}
                        >
                            <LuMinus/>
                        </button>
                        <span>{qty}</span>
                        <button
                            onClick={() => qty < product.quantity && setQty((prev) => prev + 1)}
                        >
                            <LuPlus/>
                        </button>
                    </div>
                </div>
                <div className={styles.infos__actions}>
                    <button>
                        <p>Mua ngay</p>
                    </button>
                    <button>
                        <BsHandbag/>
                        <p>Thêm vào giỏ hàng</p>
                    </button>
                    <button>
                        <BsHeart/>
                    </button>
                </div>
                <div className={styles.infos__shares}>
                    <h4>Chia sẽ:</h4>
                    <ProductShares/>
                </div>
                <div className={styles.infos__details}>
                    <ProductDetails 
                        details={[
                            product.description, 
                            ...product.details
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductInfo;