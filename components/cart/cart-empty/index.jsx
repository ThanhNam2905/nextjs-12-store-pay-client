import Link from 'next/link';
import styles from './styles.module.scss';
import { useSession } from 'next-auth/react';

const CartEmpty = () => {

    const { data: session } = useSession();

    return (
        <div className={styles.cart__empty}>
            <img src="./../../../images/empty.png" alt="" />   
            <h1>Giỏ hàng của bạn đang rỗng, chưa có sản phẩm.</h1> 
            {
                session && (
                    <button className={`${styles.cart__empty__btn} ${styles.btn__signIn}`}>Đăng nhặp / Đăng ký</button>
                )
            }      
            <Link href={"/browser"}>
                <button className={`${styles.cart__empty__btn} ${styles.shop__now}`}>
                    Mua ngay
                </button>
            </Link>
               
        </div>
    )
}

export default CartEmpty;