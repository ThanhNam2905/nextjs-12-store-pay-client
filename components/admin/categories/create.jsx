import { useState } from 'react';
import styles from './styles.module.scss'
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Box, Button, Fade, Modal, Tooltip } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { BiCommentAdd } from 'react-icons/bi';
import { IoIosCloseCircleOutline } from "react-icons/io";
import AdminInput from '../../shared/inputs/admin-input';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'background.paper',
    border: '1px solid #777',
    borderRadius: '5px',
    boxShadow: 24,
};

const CreateCategory = ({ setCategories }) => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");

    const validate = Yup.object({
        name: Yup.string()
            .required("Vui lòng điền tên danh mục!")
            .min(3, "Tên danh mục phải gồm 3 đến 40 ký tự!")
            .max(40, "Tên danh mục phải gồm 3 đến 40 ký tự!")
        ,
    });

    const handlerSubmitForm = async () => {
        try {
            const { data } = await axios.post("/api/admin/categories", { name });
            setCategories(data.categories);
            toast.success(data.message);
            setOpenModal(false);
            setName("");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    
    return (
        <>
            <div className={styles.header} style={{ marginBottom: "1.1rem" }}>Danh sách danh mục</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModal}>
                    <Box sx={style} className={styles.modal__wrapper}>
                        <div className={styles.header}>Tạo mới danh mục</div>
                        <Tooltip 
                            title={<p style={{ fontSize: "15px", padding: "2px"}}>Hủy bỏ</p>}
                            enterDelay={100} leaveDelay={100}
                            arrow
                        >
                            <>
                                <button 
                                    className={styles.close_modal}
                                    onClick={() => setOpenModal(false)}
                                >
                                    <IoIosCloseCircleOutline/>
                                </button>
                            </>
                        </Tooltip>
                        
                        <Formik
                            enableReinitialize
                            initialValues={{
                                name
                            }}
                            validationSchema={validate}
                            onSubmit={() => {
                                handlerSubmitForm()
                            }}
                        >
                            {
                                (formik) => (
                                    <Form>
                                        <AdminInput
                                            type="text"
                                            label="Tên Danh Mục"
                                            name="name"
                                            placeholder="Tên Danh mục..."
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className={`${styles.btn} ${styles.btn__primary}`}
                                        >
                                            <span>Thêm Danh Mục</span>
                                        </button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </Box>
                </Fade>
            </Modal>

            <Button 
                onClick={() => setOpenModal(true)} 
                className={`${styles.btn} ${styles.btn__primary}`}
            >
                <BiCommentAdd size={24}/>
                Thêm danh mục
            </Button>
        </>
    )
}

export default CreateCategory;