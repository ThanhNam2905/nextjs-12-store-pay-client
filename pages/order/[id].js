import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Header from '../../components/header'
import Order from '../../models/OrderModel';
import User from '../../models/UserModel';
import styles from '../../styles/order.module.scss'
import db from '../../utils/database';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect, useReducer } from 'react';
import StripePayment from '../../components/stripe-payment';
import axios from 'axios';
;

function reducer(state, action) {
    switch(action.type) {
        case "PAY_REQUEST": {
            return { ...state, loading: true };
        }
        case "PAY_SUCCESS": {
            return { ...state, loading: false, success: true };
        }
        case "PAY_FAIL": {
            return { ...state, loading: false, error: action.payload };
        }
        case "PAY_RESET": {
            return { ...state, loading: false, success: false, error: false };
        }
        default: {
            return;
        }
    }
}

export default function OrderPage({ orderData, paypal_client_id, stripe_publish_key }) {

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const [{ loading, error, success }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: "",
    });

    useEffect(() => {
        if(!orderData._id) {
            dispatch({
                type: "PAY_RESET",
            });
        }
        else {
            paypalDispatch({
                type: "resetOptions",
                value: {
                    "clientId": paypal_client_id,
                    currency: "USD",
                },
            })
            paypalDispatch({
                type: "setLoadingStatus",
                value: "pending",
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderData]);

    const createOrderHandler = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: orderData.totalPrice,
                    },
                },
            ],
        }).then((order_id) => {
            return order_id;
        })
    }

    const onApproveHandler = (data, actions) => {
        return actions.order.capture().then(async function(details) {
            try {
                dispatch({ type: "PAY_REQUEST"});
                const { data } = await axios.put(`/api/order/${orderData._id}/payWithPaypal`, {
                    details,
                    order_id: orderData._id,
                });

                console.log("data ==> ", data);
                dispatch({ type: "PAY_SUCCESS", payload: data });
            } catch (error) {
                dispatch({ type: "PAY_FAIL", payload: error });
            }
        })
    };

    const onErrorHandler = (error) => {
        console.log("error ==> ", error);
    };

    return (
        <>
            <Header country="Việt Nam" />
            <main className={styles.order}>
                <div className={styles.container}>
                    <div className={styles.order__infos}>
                        <div className={styles.order__header}>
                            <div className={styles.order__header__heading}>
                                <span>Trang Chủ</span> <MdOutlineArrowForwardIos/>
                                <span>Đơn Hàng</span> <MdOutlineArrowForwardIos/>
                                <span>Mã Đơn hàng: <em><b>DH{orderData._id.toUpperCase().substring(0,14)}</b></em></span>
                            </div>
                            <div className={styles.order__header__status}>
                                <span>Tình trạng thanh toán:</span>
                                { orderData.isPaid ? (
                                        <div className={styles.isPaid}>
                                            <img src="../../images/verified.png" alt="paid img" />
                                            <span>Đã thanh toán</span>
                                        </div>
                                    ) : (
                                        <div className={styles.isPaid}>
                                            <img src="../../images/unverified.png" alt="paid img" />
                                            <span>Chưa thanh toán</span>
                                        </div>
                                    )
                                }
                            </div>
                            <div className={styles.order__header__status}>
                                <span>Trạng thái giao hàng:</span>
                                <span className={ orderData.status === "Chờ xác nhận" ? 
                                    styles.waitting__comfirm :
                                    orderData.status === "Đã xác nhận" ? 
                                    styles.confirmed : 
                                    orderData.status === "Đang chuẩn bị hàng" ?
                                    styles.prepare__order :
                                    orderData.status === "Đang giao hàng" ?
                                    styles.delivery :
                                    orderData.status === "Đã giao hàng" ? 
                                    styles.delivered : 
                                    orderData.status === "Đã huỷ" ?
                                    styles.canceled : ""
                                }>
                                    {orderData.status}
                                </span>
                            </div>
                        </div>
                        <div className={styles.order__products}>
                            { orderData.products.map((product) => (
                                    <div 
                                        key={product._id}
                                        className={styles.product}
                                    >
                                        <div className={styles.product__img}>
                                            <img src={product.image} alt={product.image} />
                                        </div>
                                        <div className={styles.product__infos}>
                                            <h1 className={styles.product__infos__name}>
                                                { product.name.length > 36 ? (
                                                        `${product.name.substring(0, 36)}...`
                                                    ) : product.name
                                                }
                                            </h1>
                                            <div className={styles.product__infos__style}>
                                                <div>
                                                    <span>Màu sắc:</span>
                                                    <img src={product.color.image} alt={product.color.image} />
                                                </div>
                                                <span>/</span>
                                                <div>
                                                    <span>Kích thước:</span>
                                                    <span>{product.size}</span>
                                                </div>
                                            </div>
                                            <div className={styles.product__infos__price}>
                                                <span>Giá tiền:</span>
                                                <span>{product.price} đ</span>
                                            </div>
                                            <div className={styles.product__infos__quantity}>
                                                <span>Số lượng:</span>
                                                <span>{product.qty}</span>
                                            </div>
                                            <div className={styles.product__infos__totalPrice}>
                                                {(product.price * product.qty).toFixed(2)} đ
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className={styles.order__products__total}>
                                {
                                    orderData.couponApplied ? (
                                        <>
                                            <div className={styles.order__products__total__sub}>
                                                <span>Tổng tiền Tạm tính</span>
                                                <span>{orderData.totalBeforeDiscount} đ</span>
                                            </div>
                                            <div className={styles.order__products__total__sub}>
                                                <span>Mã giảm giá được áp dụng
                                                    <em>({orderData.couponApplied})</em>
                                                    <span className={styles.tag__discount}>
                                                        {orderData.discount}%
                                                    </span>
                                                </span>
                                                <em>
                                                    - {(orderData.totalBeforeDiscount - orderData.totalPrice).toFixed(2)} đ
                                                </em>
                                            </div>
                                            <div className={styles.order__products__total__sub} style={{ paddingTop: "2px"}}>
                                                <span>Phí vận chuyển</span>
                                                <span>+ {orderData.shippingPrice} đ</span>
                                            </div>
                                            <div className={`${styles.order__products__total__sub} ${styles.borderTop}`}>
                                                <span>Tổng tiền thanh toán</span>
                                                <span>{orderData.totalPrice} đ</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={styles.order__products__total__sub}>
                                                <span>Tổng tiền Tạm tính</span>
                                                <span>{orderData.totalBeforeDiscount} đ</span>
                                            </div>
                                            <div className={styles.order__products__total__sub} style={{ paddingTop: "2px"}}>
                                                <span>Phí vận chuyển</span>
                                                <span>+ {orderData.shippingPrice} đ</span>
                                            </div>
                                            <div className={`${styles.order__products__total__sub} ${styles.borderTop}`}>
                                                <span>Tổng tiền thanh toán</span>
                                                <span>{orderData.totalPrice} đ</span>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.order__actions}>
                        <div className={styles.order__address}>
                            <h2>Thông tin khách hàng</h2>
                            <div className={styles.order__address__user}>
                                <img src={orderData.user.image} alt="" />
                                <div className={styles.user__infos}>
                                    <p>
                                        <span>Tài khoản:</span>
                                        <span>{orderData.user.name}</span>
                                    </p>
                                    <p>
                                        <span>Email:</span>
                                        <span>{orderData.user.email}</span>
                                    </p>
                                </div>
                            </div>
                            <div className={styles.order__address__shipping}>
                                <h2>địa chỉ giao hàng</h2>
                                <div className={styles.address__col}>
                                    <span>Họ tên: </span>
                                    <span>{orderData.shippingAddress.fullname}.</span>
                                </div>
                                <div className={styles.address__col}>
                                    <span>
                                        Số điện thoại:
                                    </span>
                                    <span>{orderData.shippingAddress.number_phone}</span>
                                </div>
                                <div className={styles.address__col}>
                                    <span>Địa chỉ cụ thể:</span>
                                    <span>{orderData.shippingAddress.specific_address}.</span>
                                </div>
                                <div className={styles.address__col}>
                                    <span>Địa chỉ:</span>
                                    <span>{orderData.shippingAddress.wards}, {orderData.shippingAddress.districts}, {orderData.shippingAddress.city}.</span>
                                </div>
                            </div>
                            { !orderData.isPaid && (
                                    <div className={styles.order__address__payment}>
                                        <h2>Phương thức thanh toán</h2>
                                        <div className={styles.paymentMethod}>
                                            { orderData.paymentMethod === "cash" ? (
                                                    <p>Thanh toán sau khi nhận hàng.</p>
                                                ) : (
                                                    <p>Thanh toán bằng {orderData.paymentMethod}.</p>
                                                )
                                            }
                                        </div>
                                        { orderData.paymentMethod === "paypal" ? (
                                                <>
                                                    {
                                                        isPending ? (
                                                            <span>Loading...</span>
                                                        ) : (
                                                            <PayPalButtons 
                                                                createOrder={createOrderHandler}
                                                                onApprove={onApproveHandler}
                                                                onError={onErrorHandler}
                                                            />
                                                        )
                                                    }
                                                </>
                                            ) : ""
                                        }
                                        { orderData.paymentMethod === "credit_card" ? (
                                                <StripePayment 
                                                    totalPrice={orderData.totalPrice}
                                                    order_id={orderData._id}
                                                    stripe_publish_key={stripe_publish_key}
                                                />
                                            ) : ""
                                        }
                                    </div>
                                ) 
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const { query } = context;
    const { id } = query;

    await db.connectDB();

    const order = await Order.findById(id).populate({ path: "user", model: User }).lean();
    let paypal_client_id = process.env.PAYPAL_CLIENT_ID;
    let stripe_publish_key = process.env.STRIPE_PUBLISH_KEY;

    await db.disconnectDB();
    return {
        props: {
            orderData: JSON.parse(JSON.stringify(order)),
            paypal_client_id,
            stripe_publish_key,
        }
    }
};