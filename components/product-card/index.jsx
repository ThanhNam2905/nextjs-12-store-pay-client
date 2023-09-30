import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import ProductSwiper from './product-swiper';

const ProductCard = ({ product }) => {

    const [active, setActive] = useState(0);
    const [images, setImages] = useState(product.subProducts[active]?.images);
    const [pricesProduct, setPricesProduct] = useState(
        product.subProducts[active]?.sizes?.map((size) => {
            return size.price;
        }).sort((a, b) => {
            return a - b;
        })
    );
    const [stylesColor, setStylesColor] = useState(
        product.subProducts.map((item) => {
            return item.color;
        })
    );

    useEffect(() => {
        setImages(
            product.subProducts[active].images
        );
        setPricesProduct(
            product.subProducts[active]?.sizes?.map((size) => {
                return size.price;
            }).sort((a, b) => {
                return a - b;
            })
        )
    }, [active, product.subProducts]);

    return (
        <div className={styles.product}>
            <div className={styles.product__container}>
                <Link href={`/product/${product.slug}?style=${active}`}>
                    <ProductSwiper images={images}/>
                </Link>
                { product.subProducts[active].discount ? (
                        <div className={styles.discount}>
                            <span>{ product.subProducts[active].discount } %</span>
                            <span>giảm</span>
                        </div>
                    ) : (
                        ""
                    )
                }
                <div className={styles.content}>
                    <h4>
                        { product.name.length > 36 ? `${product.name.substring(0, 36)}...` : product.name }
                    </h4>
                    {/* <div className={styles.price}>
                        { pricesProduct?.length === 1 ? (
                                `${pricesProduct[0]}.00 $`
                            ) : (
                                `${pricesProduct[0]}.00 $ - ${pricesProduct[pricesProduct.length - 1]}.00 $`
                            )
                        }
                    </div> */}
                    <div className={styles.colors}>
                        { stylesColor &&
                            stylesColor.map((style, index) => (
                                <div key={index}>
                                    { style.image ? (
                                            <img 
                                                src={style.image} alt={style.image} 
                                                className={index === active ? styles.active : ""}
                                                onMouseOver={() => {
                                                    setImages(product.subProducts[index].images);
                                                    setActive(index);
                                                }}
                                            />
                                        ) : (
                                            <span
                                                style={{ backgroundColor: `${style.color}`}}
                                                onMouseOver={() => {
                                                    setImages(product.subProducts[index].images);
                                                    setActive(index);
                                                }}
                                            >
                                            </span>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;