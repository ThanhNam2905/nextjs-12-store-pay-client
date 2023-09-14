import { DataGrid } from '@mui/x-data-grid';
import styles from './styles.module.scss'
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, Fade, Modal, Slide, Tooltip } from '@mui/material';
import { BiEditAlt, BiSave } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';
import React, {  useState } from 'react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Form, Formik } from 'formik';
import AdminInput from '../../shared/inputs/admin-input';
import * as Yup from 'yup';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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


const ListCoupons = ({ coupons, setCoupons }) => {
    // =======================================================
    // Handler remove item category function.
    const [openDeleteItem, setOpenDeleteItem] = useState(false);
    const [indexCategory, setIndexCategory] = useState(null);
    
    const handleCancelDelete = () => {
        setOpenDeleteItem(false);
        setIndexCategory(null);
    };

    const showDialogDelete = (key) => {
        setOpenDeleteItem(true);
        setIndexCategory(key);
    };

    const handlerRemoveItem = async(id, coupon) => {
        try {
            const { data } = await axios.delete("/api/admin/coupons", {
                data: {id, coupon},
            });
            setCoupons(data.coupons);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    // =======================================================


    // =======================================================
    // Handler update item category function.
    const [openModal, setOpenModal] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [itemEdit, setItemEdit] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleStartDate = (newValue) => {
        setStartDate(newValue);
    };

    const handleEndDate = (newValue) => {
        setEndDate(newValue);
    };

    const handleOpenModalEditItem = (id, coupon, discount, quantity, startDate, endDate) => {
        setCoupon(coupon);
        setDiscount(discount);
        setQuantity(quantity);
        setStartDate(new Date(startDate));
        setEndDate(new Date(endDate));

        setItemEdit(id);    
        setOpenModal(true);    
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

    const handlerSubmitEditItem = async (id) => {
        try {
            if(startDate.getDate() === endDate.getDate()) {
                return toast.error("Ngày bắt đầu và ngày kết thúc không được trùng nhau!");
            }
            else if(endDate.getTime() - startDate.getTime() < 0) {
                return toast.error("Ngày kết thúc không thể nhỏ hơn ngày bắt đầu!");
            }
            const { data } = await axios.put("/api/admin/coupons", {
                id, coupon, discount, quantity, startDate, endDate,
            });
            setCoupons(data.coupons);
            setOpenModal(false);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    // =======================================================

    const dataList = [];
    for (let item = 0; item < coupons.length; item++) {
        dataList.push({
            id: item + 1,
            item: coupons[item],
            coupon: coupons[item].coupon,
            discount: coupons[item].discount,
            startDate: coupons[item].startDate,
            endDate: coupons[item].endDate,
            quantity: coupons[item].quantity,
            createdAt: coupons[item].createdAt,
            updatedAt: coupons[item].updatedAt,
        })
    }

    const columns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 70, 
        },
        { 
            field: 'coupon', 
            headerName: "Mã Coupon",
            flex: 1,
            renderCell: (params) => (<b>{params.value}</b>)
        },
        { 
            field: 'discount', 
            width: 120,
            headerName: "Discount",
            renderCell: (params) => (<b>{params.value}%</b>)
        },
        { 
            field: 'quantity', 
            with: 120,
            headerName: 'Số Lượng',
            renderCell: (params) => (<b>{params.value}</b>)
        },
        { 
            field: 'startDate', 
            headerName: 'Ngày Bắt Đầu', 
            width: 170,
            renderCell: (params) => (
                <Tooltip 
                    title={<p style={{ fontSize: "14px", padding: "1px"}}>
                        { format(parseISO(params.value), 'dd/MM/yyyy - HH:mm:ss', {
                            locale: viLocale
                        })}
                    </p>}
                    enterDelay={100} leaveDelay={100}
                    arrow
                >
                    <div>
                        {format(parseISO(params.value), 'dd/MM/yyyy - HH:mm:ss')}
                    </div>
                </Tooltip>  
            )
        },
        { 
            field: 'endDate', 
            headerName: 'Ngày kết thúc', 
            width: 170,
            renderCell: (params) => (
                <Tooltip 
                    title={<p style={{ fontSize: "14px", padding: "1px"}}>
                        { format(parseISO(params.value), 'PPPP - HH:mm:ss', {
                            locale: viLocale
                        })}
                    </p>}
                    enterDelay={100} leaveDelay={100}
                    arrow
                >
                    <div>
                        {format(parseISO(params.value), 'dd/MM/yyyy - HH:mm:ss')}
                    </div>
                </Tooltip>  
            )
        },
        { 
            field: 'createdAt', 
            headerName: "Ngày tạo",
            width: 150,
            renderCell: (params) => (
                <Tooltip 
                    title={<p style={{ fontSize: "14px", padding: "1px"}}>
                        { format(parseISO(params.value), 'PPPP - HH:MM', {
                            locale: viLocale
                        })}
                    </p>}
                    enterDelay={100} leaveDelay={100}
                    arrow
                >
                    <div>
                        {format(parseISO(params.value), 'dd/MM/yyyy - HH:MM')}
                    </div>
                </Tooltip>  
            )
        },
        { 
            field: 'updatedAt', 
            headerName: "Ngày Cập Nhật",
            width: 150,
            renderCell: (params) => (
                <Tooltip 
                    title={params.row.createdAt !== params.value && 
                            <p style={{ fontSize: "15px", padding: "2px"}}>
                                {formatDistanceToNow(
                                    parseISO(params.value),
                                    {
                                        addSuffix: true,
                                        locale: viLocale
                                    }
                                )  }
                            </p>
                    }
                    enterDelay={100} leaveDelay={100}
                    arrow
                >
                    <div>
                        { params.row.createdAt === params.value 
                            ? ("Chưa có cập nhật") 
                            : format(parseISO(params.row.updatedAt), 'dd/MM/yyyy - HH:MM')
                        }
                    </div>
                </Tooltip>  
            )
        },
        {
            field: 'item',
            headerName: "Actions",
            sortable: false,
            width: 210,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        size="small"
                        color='info'
                        style={{ textTransform: "capitalize" }}
                        startIcon={<BiEditAlt />}
                        onClick={() => handleOpenModalEditItem(
                            params.value._id, 
                            params.value.coupon, 
                            params.value.discount,
                            params.value.quantity,
                            params.value.startDate,
                            params.value.endDate,
                        )} 
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color='error'
                        style={{ marginLeft: 12, textTransform: "capitalize" }}
                        startIcon={<AiOutlineDelete />}
                        onClick={() => showDialogDelete(params.value._id)}
                    >
                        Remove
                    </Button>
                    <Dialog
                        open={params.value._id === indexCategory ? openDeleteItem : false}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCancelDelete}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogContent sx={{ padding: 4, paddingBottom: 0 }}> 
                            Bạn có muốn xóa danh mục: <b>{params.value.coupon}</b> này không?
                        </DialogContent>
                        <DialogActions sx={{ margin: 2 }}>
                            <Button 
                                onClick={() => handlerRemoveItem(params.value._id, params.value.coupon)}
                                variant="contained"
                                size="medium"
                                color='error'
                                sx={{ marginRight: 1 }}
                            >
                                Đồng Ý
                            </Button>
                            <Button 
                                onClick={handleCancelDelete}
                                variant="outlined"
                                size="medium"
                                color='inherit'
                            >
                                Hủy Bỏ
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )  
        },
    ];

    return (
        <section className={styles.list__coupons}>
            <DataGrid
                rows={dataList}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20, 50, 100]}
                checkboxSelection
            />

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
                        <div className={styles.header}>Chỉnh sửa coupon</div>
                        <button 
                            className={styles.close_modal}
                            onClick={() => setOpenModal(false)}
                        >
                            <IoIosCloseCircleOutline/>
                        </button>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                coupon,
                                discount,
                                quantity,
                            }}
                            validationSchema={validate}
                            onSubmit={() => {
                                handlerSubmitEditItem(itemEdit)
                            }}
                        >
                            {
                                (formik) => (
                                    <Form>
                                        <AdminInput
                                            type="text"
                                            label="Mã Coupon"
                                            name="coupon"
                                            value={coupon}
                                            placeholder="Mã Coupon..."
                                            onChange={(e) => setCoupon(e.target.value)}
                                        />
                                        <AdminInput
                                            type="number"
                                            label="Discount (%)"
                                            name="discount"
                                            value={discount}
                                            onChange={(e) => setDiscount(e.target.value)}
                                        />
                                        <AdminInput
                                            type="number"
                                            label="Số lượng coupon"
                                            name="quantity"
                                            value={quantity}
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
                                        <div style={{display: "flex", alignItems: "center", gap: "1.1rem", marginTop: "1.6rem"}}>
                                            <Button
                                                type='submit'
                                                variant="contained"
                                                size="large"
                                                color='info'
                                                style={{textTransform: "capitalize"}}
                                                startIcon={<BiSave />}
                                            >
                                                Cập nhật
                                            </Button>
                                            <Button
                                                type='button'
                                                variant="outlined"
                                                size="large"
                                                color='inherit'
                                                style={{textTransform: "capitalize"}}
                                                onClick={() => setOpenModal(false)}
                                            >
                                                Hủy bỏ
                                            </Button>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                    </Box>
                </Fade>
            </Modal>
        </section>
    )
}

export default ListCoupons;