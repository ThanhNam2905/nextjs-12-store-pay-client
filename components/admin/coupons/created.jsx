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
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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

const CreateCoupon = ({ setCoupons }) => {
    const [openModal, setOpenModal] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const today = new Date();
    today.setUTCHours(-7, 0, 1); // UTC: +7
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setUTCHours(16,59,59); // UTC: +7
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);

    const handleStartDate = (newValue) => {
        setStartDate(newValue);
    };

    const handleEndDate = (newValue) => {
        setEndDate(newValue);
    };

    const validate = Yup.object({
        coupon: Yup.string()
            .required("Vui lòng điền mã coupon!")
            .min(6, "Mã coupon phải gồm 6 đến 10 ký tự!")
            .max(20, "Mã coupon phải gồm 6 đến 10 ký tự!")
        ,
        discount: Yup.number()
            .required("Vui lòng điền phần trăm discount!")
            .min(1, "Discount phải có giá trị từ 1% đến 99%!")
            .max(99, "Discount phải có giá trị từ 1% đến 99%!")
        ,
        quantity: Yup.number()
            .required("Vui lòng điền số lượng coupon")
            .min(1, "Số lượng coupon phải có giá trị lớn hơn 1")
    });

    const handlerSubmitForm = async () => {
        try {
            if(startDate.getDate() === endDate.getDate()) {
                return toast.error("Ngày bắt đầu và ngày kết thúc không được trùng nhau!");
            }
            else if(endDate.getTime() - startDate.getTime() < 0) {
                return toast.error("Ngày kết thúc không thể nhỏ hơn ngày bắt đầu!");
            }

            const { data } = await axios.post("/api/admin/coupons", { 
                coupon: coupon.replace(/\s/g, '').trim(),
                discount,
                startDate,
                endDate,
                quantity,
            });
            setCoupons(data.coupons);
            toast.success(data.message);
            setOpenModal(false);
            setCoupon("");
            setDiscount(0);
            setQuantity(0);
            setStartDate(today);
            setEndDate(tomorrow);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    
    return (
        <div>
            <h2 className={styles.header} style={{ marginBottom: "1.1rem" }}>Danh sách coupon</h2>

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
                        <div className={styles.header}>Tạo mới coupon</div>
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
                                coupon,
                                discount,
                                quantity,
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
                                            label="Mã Coupon"
                                            name="coupon"
                                            placeholder="Mã Coupon..."
                                            onChange={(e) => setCoupon(e.target.value)}
                                        />
                                        <AdminInput
                                            type="number"
                                            label="Discount (%)"
                                            name="discount"
                                            onChange={(e) => setDiscount(e.target.value)}
                                        />
                                        <AdminInput
                                            type="number"
                                            label="Số lượng coupon"
                                            name="quantity"
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                        <div className={styles.date__picker}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker 
                                                    label="Ngày bắt đầu coupon"
                                                    format="dd/MM/yyyy HH:mm:ss"
                                                    formatDensity="spacious"
                                                    value={startDate}
                                                    onChange={handleStartDate}
                                                    minDate={startDate}
                                                    
                                                />
                                            </LocalizationProvider>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                    label="Ngày kết thúc coupon"
                                                    format="dd/MM/yyyy HH:mm:ss"
                                                    formatDensity="spacious"
                                                    value={endDate}
                                                    onChange={handleEndDate}
                                                    minDate={endDate}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <button
                                            type="submit"
                                            className={`${styles.btn} ${styles.btn__primary}`}
                                        >
                                            <span>Thêm Coupon</span>
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
                Thêm coupon
            </Button>
        </div>
    )
}

export default CreateCoupon;