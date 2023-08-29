import { MdOutlinePayment } from 'react-icons/md'
import styles from './styles.module.scss'
import { paymentMethods } from '../../../data/payment-methods'

export const PaymenthMethods = ({ paymentMethod, setPaymentMethod }) => {
    return (
        <div className={styles.payment}>
            <div className={styles.payment__header}>
                <MdOutlinePayment/>
                <h2>Phương thức thanh toán</h2>
            </div>
            <div>
                {
                    paymentMethods.map((payment, index) => (
                        <label 
                            htmlFor={payment.id}
                            key={index}
                            className={styles.payment__item}
                            onClick={() => setPaymentMethod(payment.id)}
                            style={{ backgroundColor: `${paymentMethod == payment.id ? "#f5f5f5" : ""}`}}
                        >
                            <input 
                                type="radio" 
                                name='payment'
                                id={payment.id}
                                checked={paymentMethod === payment.id}
                            />

                            <img 
                                src={`../../../images/checkout/${payment.id}.webp`} 
                                alt={payment.name}
                                className={styles.payment__item__thumbnail}
                            />
            
                            <div className={styles.payment__item__col}>
                                <p>Thanh toán với {payment.name}</p>
                                <span>
                                    {
                                        payment.images.length > 0 ? 
                                            payment.images.map((img, index) => (
                                                <img 
                                                    key={index}
                                                    src={`../../../images/payment/${img}.webp`} 
                                                    alt={img} 
                                                    className={styles.payment__item__img}
                                                />
                                            )) : (payment.description)
                                    }
                                </span>
                            </div>
                        </label>
                    ))
                }
            </div>
        </div>
    )
}
