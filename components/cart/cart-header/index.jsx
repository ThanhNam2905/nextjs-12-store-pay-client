import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import { compareArrays } from '../../../utils/arrays_utils';

const CartHeader = ({ cartItems, selectedItems, setSelectedItems }) => {

    const [active, setActive] = useState();

    useEffect(() => {
        const check = compareArrays(cartItems, selectedItems);
        setActive(check); 
    }, [cartItems, selectedItems]);

    const handleSelectedAllItems = () => {
        if(selectedItems.length !== cartItems.length) {
            setSelectedItems(cartItems);
        }
        else {
            setSelectedItems([]);
        }
    }

    return (
        <div className={`${styles.cartItems} ${styles.card}`}>
            <h2>Số lượng sản phẩm: <span>( {cartItems.length} )</span></h2>
            <div className={styles.flex} onClick={() => handleSelectedAllItems()}>
                <div className={`${styles.checkbox} ${active ? styles.active : ""}`}></div>
                <span>{active ? "Bỏ chọn tất cả" : "Chọn tất cả items"}</span>
            </div>
        </div>
    )
}

export default CartHeader;