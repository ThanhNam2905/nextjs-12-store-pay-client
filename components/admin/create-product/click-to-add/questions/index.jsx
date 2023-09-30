import styles from './styles.module.scss';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { Tooltip } from '@mui/material';

export const Questions = ({ questions, product, setProduct }) => {
    const handleQuestions = (e, index) => {
        let values = [...questions];
        values[index][e.target.name] = e.target.value;
        setProduct({
            ...product, questions: values,
        });
    };

    const handleRemove = (index) => {
        if(questions.length > 0) {
            let values = [...questions];
            values.splice(index, 1);
            setProduct({
                ...product,
                questions: values,
            });
        }
    }
    
    return (
        <div className={styles.questions}>
            <div className={styles.heading}>
                <p>
                    Câu hỏi sản phẩm
                    <span>*</span>
                </p>
            </div> 
            { questions.length === 0 && (
                    <button 
                        className={styles.questions__btn}
                        onClick={() => {
                            setProduct({
                                ...product,
                                questions: [
                                    ...questions, {
                                        question: "",
                                        answer: "",
                                    }
                                ]
                            })
                        }}
                    >
                        <AiOutlinePlusCircle/>
                        <span>Thêm câu hỏi</span>
                    </button>    
                    )
            }
            { questions ? questions.map((item, index) => (
                    <div className={styles.questions__wrapper} key={index}>
                        <input 
                            type="text" 
                            name="question" 
                            placeholder="Question"
                            onChange={(e) => handleQuestions(e, index)}
                            value={item.question}
                        />
                        <input 
                            type="text" 
                            name="answer" 
                            placeholder="Answer"
                            onChange={(e) => handleQuestions(e, index)}
                            value={item.answer}
                        />
                        <div className={styles.questions__actions}>
                            <Tooltip 
                                title={<p style={{ fontSize: "15px", padding: "2px"}}>Xóa</p>}
                                arrow
                            >
                                <button type='reset' className={styles.questions__actions__btn}>
                                    <AiOutlineMinusCircle 
                                        onClick={() => handleRemove(index)}
                                    />
                                </button>    
                            </Tooltip>
                            <Tooltip 
                                title={<p style={{ fontSize: "15px", padding: "2px"}}>Thêm</p>}
                                arrow
                            >
                                <button type='reset' className={styles.questions__actions__btn}>
                                    <AiOutlinePlusCircle
                                        onClick={() => {
                                            setProduct({
                                                ...product,
                                                questions: [
                                                    ...questions, {
                                                        question: "",
                                                        answer: "",
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
