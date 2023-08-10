import React, { useState } from 'react';
import styles from './../../styles/product.module.scss';
import db from '../../utils/database';
import Product from '../../models/ProductModel';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Category from '../../models/CategoryModel';
import SubCategory from '../../models/SubCategoryModel';
import ProductImages from '../../components/product-detail/product-images';
import ProductInfo from '../../components/product-detail/product-info';
import ProductSimillars from '../../components/product-detail/product-simillars';
import ProductReviews from '../../components/product-detail/product-reviews';
import User from '../../models/UserModel';

const ProductDetailPage = ({ product }) => {

    const [activeImage, setActiveImage] = useState("")
    // console.log("review ==> ", product.reviews);

    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <Header country="Viet Nam"/>

            <main className={styles.product}>
                <div className={styles.container}>
                    <div className={styles.breadcrumbs}>
                        <p>Trang chủ</p>
                        <span>/</span>
                        <p>{product.category.name}</p>
                        { product.subCategories.map((sub, index) => (
                                <p key={index}>/ {sub.name}</p>
                            ))
                        }
                    </div>
                    <div className={styles.product__detail}>
                        <ProductImages 
                            images={product.images} 
                            activeImage={activeImage}
                        />
                        <ProductInfo 
                            product={product}
                            setActiveImage={setActiveImage}
                        />
                    </div>
                    <div className={styles.product__reviews}>
                        <ProductReviews
                            product={product}
                        />
                    </div>
                    <div className={styles.product__simillars}>
                        <ProductSimillars/>
                    </div>
                </div>
            </main>

            <Footer country="Viet Nam"/>
        </>
    )
}

export default ProductDetailPage;

export async function getServerSideProps(context) {
    const { query } = context;
    const { slug } = query;
    const { style } = query;
    const size = query.size || 0;

    await db.connectDB();

    let product = await Product.findOne({ slug })
        .populate({ path: "category", model: Category })
        .populate({ path: "subCategories._id", model: SubCategory })
        .populate({ path: "reviews.reviewBy", model: User })
        .lean();

    let subProducts = product.subProducts[style];
    let pricesProduct = subProducts.sizes.map((item) => {
        return item.price;
    }).sort((a, b) => {
        return a - b;
    });

    let newProduct = {
        ...product,
        style: style,
        images: subProducts.images,
        sizes: subProducts.sizes,
        discount: subProducts.discount,
        sku: subProducts.sku,
        colors: product.subProducts.map((item) => {
            return item.color;
        }),
        pricesRange: subProducts.discount > 0 ? (
            `${ pricesProduct[0] * ((100 - subProducts.discount) / 100) }$ - 
            ${ pricesProduct[pricesProduct.length - 1] * ((100 - subProducts.discount) / 100) }$`
        ) : `${pricesProduct[0]}$ - ${pricesProduct[pricesProduct.length - 1]}$`,
        price: subProducts.discount > 0 ? (
            subProducts.sizes[size].price * ((100 - subProducts.discount) / 100)
        ) : (
            subProducts.sizes[size].price
        ),
        priceBefore: subProducts.sizes[size].price,
        quantity: subProducts.sizes[size].qty,
        ratings: [
            {
                percentage: 76,
            },
            {
                percentage: 14,
            },
            {
                percentage: 5,
            },
            {
                percentage: 3,
            },
            {
                percentage: 2,
            },
        ],
        allSizes: product.subProducts
            .map((p) => {
                return p.sizes;
            })
            .flat()
            .sort((a, b) => {
                return a.size - b.size;
            })
            .filter((element, index, array) => array.findIndex((ele2) => ele2.size === element.size) === index),
    };

    await db.disconnectDB();

    return {
        props: {
            product: JSON.parse(JSON.stringify(newProduct)),
        },
    };
};