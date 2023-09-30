import { useState } from 'react';
import styles from './styles.module.scss';
import { sizesList } from '../../../../../data/sizes';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { Button, Tooltip } from '@mui/material';

export const Sizes = ({ sizes, product, setProduct }) => {
    const [noSize, setNoSize] = useState(false);

    const handleSize = (e, index) => {
        let values = [...sizes];
        values[index][e.target.name] = e.target.value;
        setProduct({
            ...product, sizes: values,
        });
    };

    const handleRemove = (index) => {
        if(sizes.length > 1) {
            let values = [...sizes];
            values.splice(index, 1);
            setProduct({
                ...product,
                sizes: values,
            });
        }
    }

    return (
        <div className={styles.sizes}>
            <div className={styles.heading}>
                <p>
                    Kích cỡ / Số lượng / Giá tiền
                    <span>*</span>
                </p>
            </div>
            <button 
                type='reset' 
                className={styles.btn__primary}
                onClick={() => {
                    if(!noSize) {
                        let data = sizes.map((item) => {
                            return {
                                qty: item.qty,
                                price: item.price,
                            };
                        });
                        setProduct({ ...product, sizes: data });
                    }
                    else {
                        let data = sizes.map((item) => {
                            return {
                                size: item.size || "",
                                qty: item.qty,
                                price: item.price,
                            };
                        });
                        setProduct({ ...product, sizes: data });
                    }
                    setNoSize((prev) => !prev);
                }}
            >
                { noSize ? "Click vào nếu sản phẩm có kích thước" : "Click vào nếu sản phẩm không có kích thước" }
            </button>
            {
                sizes ? sizes.map((size, index) => (
                    <div className={styles.sizes__wrapper} key={index}>
                        <select 
                            name="size"
                            value={noSize ? "" : size.size}
                            disabled={noSize}
                            style={{ display: `${noSize ? "none" : "block"}` }}
                            onChange={(e) => handleSize(e, index)}
                        >
                            <option value="">Chọn kích cỡ</option>
                            { sizesList.map((item, index) => (
                                    <option 
                                        value={item} 
                                        key={index}
                                    >
                                        {item}
                                    </option>
                                ))
                            }
                        </select>
                        <input 
                            type="number" 
                            name="qty" 
                            placeholder={noSize ? "Số lượng sản phẩm" : "Số lượng kích cỡ"}
                            onChange={(e) => handleSize(e, index)}
                            value={size.qty}
                            min={1}
                        />
                        <input 
                            type="number" 
                            name="price" 
                            placeholder={noSize ? "Giá tiền sản phẩm" : "Giá tiền kích cỡ"}
                            onChange={(e) => handleSize(e, index)}
                            value={size.price}
                            min={1}
                        />
                        { !noSize ? (
                                <div className={styles.sizes__actions}>
                                    <Tooltip 
                                        title={<p style={{ fontSize: "15px", padding: "2px"}}>Xóa</p>}
                                        arrow
                                    >
                                        <button type='reset' className={styles.sizes__actions__btn}>
                                            <AiOutlineMinusCircle 
                                                onClick={() => handleRemove(index)}
                                            />
                                        </button>    
                                    </Tooltip>

                                    <Tooltip 
                                        title={<p style={{ fontSize: "15px", padding: "2px"}}>Thêm</p>}
                                        arrow
                                    >
                                        <button type='reset' className={styles.sizes__actions__btn}>
                                            <AiOutlinePlusCircle
                                                onClick={() => {
                                                    setProduct({
                                                        ...product,
                                                        sizes: [
                                                            ...sizes, {
                                                                size: "",
                                                                qty: "",
                                                                price: "",
                                                            }
                                                        ]
                                                    })
                                                }}
                                            />
                                        </button>    
                                    </Tooltip>
                                </div>
                            ) : ""
                        }
                    </div>
                ))  : ""
            }
        </div>
    )
}
