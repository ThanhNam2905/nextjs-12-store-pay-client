import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Header from '../../components/header'
import Order from '../../models/OrderModel';
import styles from '../../styles/order.module.scss'
import db from '../../utils/database';

const OrderPage = ({ order }) => {
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
                                <span>Mã Đơn hàng: <em><b>DH{order._id.toUpperCase().substring(0,14)}</b></em></span>
                            </div>
                            <div className={styles.order__header__status}>
                                <span>Tình trạng thanh toán:</span>
                                { order.isPaid ? (
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
                                <span className={ order.status === "Chờ xác nhận" ? 
                                    styles.waitting__comfirm :
                                    order.status === "Đã xác nhận" ? 
                                    styles.confirmed : 
                                    order.status === "Đang chuẩn bị hàng" ?
                                    styles.prepare__order :
                                    order.status === "Đang giao hàng" ?
                                    styles.delivery :
                                    order.status === "Đã giao hàng" ? 
                                    styles.delivered : 
                                    order.status === "Đã huỷ" ?
                                    styles.canceled : ""
                                }>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                        <div className={styles.order__products}>
                            { order.products.map((product) => (
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
                                    order.couponApplied ? (
                                        <>
                                            <div className={styles.order__products__total__sub}>
                                                <span>Tổng tiền Tạm tính</span>
                                                <span>{order.totalBeforeDiscount} đ</span>
                                            </div>
                                            <div className={styles.order__products__total__sub}>
                                                <span>Mã giảm giá được áp dụng
                                                    <em>({order.couponApplied})</em>
                                                    <span className={styles.tag__discount}>
                                                        {order.discount}%
                                                    </span>
                                                </span>
                                                <em>
                                                    - {order.totalBeforeDiscount - order.totalPrice} đ
                                                </em>
                                            </div>
                                            <div className={styles.order__products__total__sub} style={{ paddingTop: "2px"}}>
                                                <span>Phí vận chuyển</span>
                                                <span>+ {order.shippingPrice} đ</span>
                                            </div>
                                            <div className={`${styles.order__products__total__sub} ${styles.borderTop}`}>
                                                <span>Tổng tiền thanh toán</span>
                                                <span>{order.totalPrice} đ</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={styles.order__products__total__sub}>
                                                <span>Tổng tiền Tạm tính</span>
                                                <span>{order.totalBeforeDiscount} đ</span>
                                            </div>
                                            <div className={styles.order__products__total__sub} style={{ paddingTop: "2px"}}>
                                                <span>Phí vận chuyển</span>
                                                <span>+ {order.shippingPrice} đ</span>
                                            </div>
                                            <div className={`${styles.order__products__total__sub} ${styles.borderTop}`}>
                                                <span>Tổng tiền thanh toán</span>
                                                <span>{order.totalPrice} đ</span>
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
                                <img src={order.user.image} alt="" />
                                <div className={styles.user__infos}>
                                    <p>
                                        <span>Tài khoản:</span>
                                        <span>{order.user.name}</span>
                                    </p>
                                    <p>
                                        <span>Email:</span>
                                        <span>{order.user.email}</span>
                                    </p>
                                </div>
                            </div>
                            <div className={styles.order__address__shipping}>
                                <h2>địa chỉ giao hàng và thanh toán</h2>
                                <div className={styles.address__col}>
                                    <span>Họ tên: </span>
                                    <span>{order.shippingAddress.fullname}.</span>
                                </div>
                                <div className={styles.address__col}>
                                    <span>
                                        Số điện thoại:
                                    </span>
                                    <span>{order.shippingAddress.number_phone}</span>
                                </div>
                                <div className={styles.address__col}>
                                    <span>Địa chỉ cụ thể:</span>
                                    <span>{order.shippingAddress.specific_address}.</span>
                                </div>
                                <div className={styles.address__col}>
                                    <span>Địa chỉ:</span>
                                    <span>{order.shippingAddress.wards}, {order.shippingAddress.districts}, {order.shippingAddress.city}.</span>
                                </div>
                            </div>
                            <div className={styles.order__address__payment}>
                                <h2>Phương thức thanh toán</h2>
                                <div className={styles.paymentMethod}>
                                    {
                                        order.paymentMethod === "cash" ? (
                                            <p>Thanh toán sau khi nhận hàng.</p>
                                        ) : (
                                            <p>Thanh toán bằng {order.paymentMethod}.</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default OrderPage;

export async function getServerSideProps(context) {
    const { query } = context;
    const { id } = query;
    await db.connectDB();
    const order = await Order.findById(id).populate("user").lean();

    await db.disconnectDB();
    console.log("order ===> ", order);
    return {
        props: {
            order: JSON.parse(JSON.stringify(order)),
        }
    }
};