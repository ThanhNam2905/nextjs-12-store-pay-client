import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Rating } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LuMinus, LuPlus } from "react-icons/lu";
import { BsHandbag, BsHeart } from 'react-icons/bs';
import ProductShares from './product-shares';
import ProductDetails from './product-details';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCart } from '../../../store/cartSlice';

const ProductInfo = ({ product, setActiveImage }) => {

    const { cart } = useSelector((state) => ({...state}));
    console.log("cart ==>", cart);
    const dispatch = useDispatch();

    const router = useRouter();
    const [size, setSize] = useState(router.query.size);
    const [qty, setQty] = useState(1);
    const [error, setError] = useState("");

    useEffect(() => {
        setQty(1);
        setSize("");
    }, [router.query.style]);

    useEffect(() => {
        if(qty > product.quantity) {
            setQty(product.quantity);
        }
    }, [product.quantity, qty, router.query.size]);

    // Functionality Handle add to cart.
    const addToCartHandle = async(product) => {
        if(!router.query.size) {
            setError("Vui lòng chọn kích thước sản phẩm");
            return;
        }

        const { data } = await axios.get(`/api/product/${product._id}?style=${product.style}&size=${router.query.size}`);
        
        if(qty > data.quantity) {
            setError("Số lượng sản phẩm bạn đặt hàng vượt quá số lượng trong kho.")
        }

        else if(data.quantity < 1 || data.quantity === 0) {
            setError("Sản phẩm này hiện tại đã hết hàng");
            return;
        }
        else {
            let _uid = `${data._id}_${product.style}_${router.query.size}`;
            let existItem = cart.cartItems?.find((item) => item._uid === _uid);
            if(existItem) {
                // update cart
                let newCartItems = cart.cartItems.map((item) => {
                    if(item._uid === existItem._uid) {
                        return { ...item, qty: existItem.qty + qty};
                    }
                    return item;
                });
                dispatch(updateCart(newCartItems));
            }
            else {
                // add to cart
                dispatch(addToCart({
                    ...data,
                    qty, 
                    size: data.size,
                    _uid,
                }));
            }
        }
       
    }

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
                {
                    error && (
                        <div className={styles.message__error}>
                            {error}
                        </div>
                    )
                }
                
                <div className={styles.infos__actions}>
                    <button>
                        <p>Mua ngay</p>
                    </button>
                    <button
                        onClick={() => addToCartHandle(product)}    
                    >
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