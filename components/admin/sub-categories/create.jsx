import { useState } from 'react';
import styles from './styles.module.scss'
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import AdminInput from '../../shared/inputs/admin-input';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Box, Button, Fade, Modal, Tooltip} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { BiCommentAdd } from 'react-icons/bi';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SingularSelect } from '../../shared/selects/singular-select';

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

const CreateSubCategory = ({ setSubCategories, categories }) => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");

    const validate = Yup.object({
        name: Yup.string()
            .required("Vui lòng điền tên danh mục phụ!")
            .min(3, "Tên danh mục phụ phải gồm 3 đến 50 ký tự!")
            .max(50, "Tên danh mục phụ phải gồm 3 đến 50 ký tự!")
        ,
        parent: Yup.string()
            .required("Vui lòng chọn loại danh mục!")
    });

    const handlerSubmitForm = async () => {
        try {
            const { data } = await axios.post("/api/admin/sub-categories", { 
                name,
                parent,
            });
            setSubCategories(data.subCategories);
            toast.success(data.message);
            setOpenModal(false);
            setName("");
            setParent("");
        } catch (error) {
            console.log("error ==> ", error);
            toast.error(error.response.data.message);
        }
    };
    
    return (
        <>
            <div className={styles.header} style={{ marginBottom: "1.1rem" }}>Danh sách danh mục phụ</div>
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
                        <div className={styles.header}>Tạo mới danh mục phụ</div>
                        <Tooltip 
                            title={<p style={{ fontSize: "15px", padding: "2px"}}>Hủy bỏ</p>}
                            enterDelay={100} leaveDelay={100}
                            arrow
                        >
                            <button 
                                className={styles.close_modal}
                                onClick={() => setOpenModal(false)}
                            >
                                <IoIosCloseCircleOutline/>
                            </button>
                        </Tooltip>
                        
                        <Formik
                            enableReinitialize
                            initialValues={{
                                name,
                                parent,
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
                                            label="Tên Danh Mục Phụ"
                                            name="name"
                                            placeholder="Tên danh mục phụ..."
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <p className={styles.label__select}>
                                            Loại Danh mục<span>*</span>
                                        </p>
                                        <SingularSelect
                                            name="parent"
                                            value={parent}
                                            placeholder="Chọn danh mục"
                                            handleChange={(e) => setParent(e.target.value)}
                                            data={categories}
                                            disabled={false}
                                        />
                                        <button
                                            type="submit"
                                            className={`${styles.btn} ${styles.btn__primary}`}
                                        >
                                            <span>Thêm Danh Mục Phụ</span>
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
                Thêm danh mục phụ
            </Button>
        </>
    )
}

export default CreateSubCategory;