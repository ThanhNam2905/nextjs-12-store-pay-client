import { useState } from 'react';
import styles from './styles.module.scss';
import * as Yup from 'yup';
import { MdOutlineSummarize } from "react-icons/md";
import { Form, Formik } from 'formik';
import { CheckoutInput } from '../../shared/inputs/checkout-input';
import { applyCoupon } from '../../../requests/user';
import Router from 'next/router';
import axios from 'axios';

export const Summary = ({
    totalAfterDiscount,
    setTotalAfterDiscount,
    user,
    cart,
    selectedAddress,
    paymentMethod,
}) => {

    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState("");
    const [errorApplyCoupon, setErrorApplyCoupon] = useState("");
    const [successApplyCoupon, setSuccessApplyCoupon] = useState("");
    const [errorOrder, setErrorOrder] = useState("");

    const validateCoupon = Yup.object({
        coupon: Yup.string()
            .required("Vui lòng điền mã giảm giá/coupon của bạn!"),
    });

    // Handler when user apply coupon discount.
    const applyCouponHandler = async() => {
        
        const res = await applyCoupon(coupon);
        if(res.message) {
            setErrorApplyCoupon(res.message);
            setSuccessApplyCoupon("");
            setTotalAfterDiscount("");
            setDiscount("");
        }
        else {
            setTotalAfterDiscount(res.totalAfterDiscount);
            setDiscount(res.discount);
            setErrorApplyCoupon("");
            setSuccessApplyCoupon(res.success);
        }
    };

    // Handler when user click place order.
    const placeOrderHandler = async() => {
        try {
            if(paymentMethod === "") {
                setErrorOrder("Vui lòng chọn phương thức thanh toán cho đơn hàng của bạn!");
                return;
            }
            else if(!selectedAddress) {
                setErrorOrder("Vui lòng chọn địa chỉ giao hàng cho đơn hàng của bạn!");
                return;
            }
            const { data } = await axios.post("/api/order/create", {
                products: cart.products,
                shippingAddress: selectedAddress,
                paymentMethod: paymentMethod,
                totalPrice: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotalPrice,
                totalBeforeDiscount: cart.cartTotalPrice,
                couponApplied: coupon,
                discount: discount,
            });
            Router.push(`/order/${data.order_id}`);
        } catch (error) {
            setErrorOrder(error.response.data.message);
        }
    };

    return (
        <div className={styles.summary}>
            <div className={styles.summary__header}>
                <MdOutlineSummarize/>
                <h2>Sơ lược thanh toán</h2>
            </div>
            <div className={styles.summary__coupon}>
                <Formik
                    enableReinitialize
                    initialValues={{coupon}}
                    validationSchema={validateCoupon}
                    onSubmit={() => {
                        applyCouponHandler();
                    }}
                >
                    {
                        (formik) => (
                            <Form>
                                <CheckoutInput
                                    name="coupon"
                                    placeholder="Mã giảm giá/coupon..."
                                    onChange={(e) => setCoupon(e.target.value)}
                                />
                                {errorApplyCoupon !== "" && <span className={styles.error}>{errorApplyCoupon}</span>}
                                {successApplyCoupon !== "" && <span className={styles.success}>{successApplyCoupon}</span>}
                                <button type='submit'>Áp dụng</button>
                                <div className={styles.summary__coupon__infos}>
                                    <div>
                                        <span>Tổng tiền tạm tính: </span>
                                        <b>{cart.cartTotalPrice} đ</b>
                                    </div>
                                    { discount > 0 && (
                                            <div className={styles.discount}>
                                                <span>Mã giảm giá: </span>
                                                <b>- {discount}%</b>
                                            </div>
                                        )
                                    }
                                    { totalAfterDiscount < cart.cartTotalPrice && totalAfterDiscount !== "" ? (
                                            <div>
                                                <span>Tổng thanh toán: </span>
                                                <b>{totalAfterDiscount} đ</b>
                                            </div>
                                        ) : (
                                            <div>
                                                <span>Tổng thanh toán: </span>
                                                <b>{cart.cartTotalPrice} đ</b>
                                            </div>
                                        )
                                    }
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            <button 
                className={styles.btn__place__order} 
                onClick={() => placeOrderHandler()}
            >
                Đặt hàng
            </button>
            { errorOrder && <div className={styles.error}>{errorOrder}</div> }
        </div>
    )
}
