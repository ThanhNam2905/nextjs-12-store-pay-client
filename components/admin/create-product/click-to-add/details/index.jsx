import styles from './styles.module.scss';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { Tooltip } from '@mui/material';

export const Details = ({ details, product, setProduct }) => {
    const handleDetails = (e, index) => {
        let values = [...details];
        values[index][e.target.name] = e.target.value;
        setProduct({
            ...product, details: values,
        });
    };

    const handleRemove = (index) => {
        if(details.length > 0) {
            let values = [...details];
            values.splice(index, 1);
            setProduct({
                ...product,
                details: values,
            });
        }
    }
    
    return (
        <div className={styles.details}>
            <div className={styles.heading}>
                <p>
                    Chi tiết sản phẩm
                    <span>*</span>
                </p>
            </div> 
            { details.length === 0 && (
                    <button 
                        className={styles.details__btn}
                        onClick={() => {
                            setProduct({
                                ...product,
                                details: [
                                    ...details, {
                                        name: "",
                                        value: "",
                                    }
                                ]
                            })
                        }}
                    >
                        <AiOutlinePlusCircle/>
                        <span>Thêm chi tiết</span>
                    </button>    
                    )
            }
            { details ? details.map((detail, index) => (
                    <div className={styles.details__wrapper} key={index}>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name"
                            onChange={(e) => handleDetails(e, index)}
                            value={detail.name}
                        />
                        <input 
                            type="text" 
                            name="value" 
                            placeholder="Value"
                            onChange={(e) => handleDetails(e, index)}
                            value={detail.value}
                        />
                        <div className={styles.details__actions}>
                            <Tooltip 
                                title={<p style={{ fontSize: "15px", padding: "2px"}}>Xóa</p>}
                                arrow
                            >
                                <button type='reset' className={styles.details__actions__btn}>
                                    <AiOutlineMinusCircle 
                                        onClick={() => handleRemove(index)}
                                    />
                                </button>    
                            </Tooltip>
                            <Tooltip 
                                title={<p style={{ fontSize: "15px", padding: "2px"}}>Thêm</p>}
                                arrow
                            >
                                <button type='reset' className={styles.details__actions__btn}>
                                    <AiOutlinePlusCircle
                                        onClick={() => {
                                            setProduct({
                                                ...product,
                                                details: [
                                                    ...details, {
                                                        name: "",
                                                        value: "",
                                                    }
                                                ]
                                            })
                                        }}
                                    />
                                </button>    
                            </Tooltip>
                        </div>
                    </div>
                ))  : ""
            }
        </div>
    )
}
