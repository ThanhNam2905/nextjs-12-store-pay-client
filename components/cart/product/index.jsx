import { BsHeart, BsArrowRight } from 'react-icons/bs';
import styles from './styles.module.scss'
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../../store/cartSlice';

export const Product = ({ product }) => {

    const { cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const updateQtyHandle = (type) => {
        let newCart = cart.cartItems.map((item) => {
            if(item._uid === product._uid) {
                return {
                    ...item,
                    qty: type === "plus" ? item.qty + 1 : item.qty - 1,
                };
            }
            return item;
        });

        dispatch(updateCart(newCart));
    };

    const removeItemCartHandle = (uid) => {
        let newCart = cart.cartItems.filter((item) => item._uid !== uid);
        dispatch(updateCart(newCart));
    }

    return (
        <div className={`${styles.card} ${styles.product}`}>
            { product.quantity < 1 && (
                    <div className={styles.blur}></div>
                ) 
            }
            <div className={styles.product__header}>
                <img src="./../../../images/store.webp" alt="" />
                <p>M74JJ Store Nike</p>
            </div>
            <div className={styles.product__image}>
                <div className={styles.checkbox}></div>
                <img src={product.images[0].url} alt="" />
                <div className={styles.col}>
                    <div className={styles.grid}>
                        <Link href={`/product/${product.slug}?style${product.style}&size${product.size}`}>
                            <h3>
                                {product.name.length > 42 ? `${product.name.substring(0, 42)}...` : product.name }
                            </h3>
                        </Link>
                        <div style={{ zIndex: 2, marginRight: "8px"}}>
                            <BsHeart size={19}/>
                        </div>
                        <div style={{ zIndex: 2}}>
                            <AiFillDelete 
                                size={19} 
                                onClick={() => removeItemCartHandle(product._uid)}
                            />
                        </div>
                    </div>
                    <div className={styles.style}>
                        <img src={product.color.image} alt="" />
                        { product.size && (
                                <span>{product.size}</span>
                            ) 
                        }
                        { product.price && (
                                <span>{product.price} đ</span>
                            )
                        }
                        <BsArrowRight/>
                    </div>
                    <div className={styles.prices}>
                        <div className={styles.prices__price}>
                            <span className={styles.price}>
                                {(product.price * product.qty).toFixed(2)} đ
                            </span>
                            { product.priceBefore && (
                                    <span className={styles.priceBefore}>
                                        { product.priceBefore } đ
                                    </span>
                                )
                            }
                            { product.discount > 0 && (
                                <span className={styles.discount}>Giảm {product.discount}%</span>
                            )}
                        </div>
                        <div className={styles.prices__qty}>
                            <button
                                disabled={product.qty < 2}
                                onClick={() => updateQtyHandle("minus")}
                            >
                                <AiOutlineMinus/>
                            </button>
                            <span>{product.qty}</span>
                            <button
                                disabled={product.qty === product.quantity}
                                onClick={() => updateQtyHandle("plus")}
                            >
                                <AiOutlinePlus/>
                            </button>
                        </div>
                        <div className={styles.prices__shipping}>
                            { product.shipping ? (
                                    <span>{`+ ${product.shipping} phí vận chuyễn`}</span>
                                ) : (
                                    <span>Miễn phí vận chuyễn</span>
                                )
                            }
                        </div>
                        { product.quantity < 1 && (
                            <div className={styles.outOfStock}>
                                Sản phẩm này của bạn hiện tại đã hết hàng, bạn có thể lưu vào danh sách yêu thích cho lần Restocked sau.
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};
