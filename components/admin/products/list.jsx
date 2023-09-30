import { DataGrid } from '@mui/x-data-grid';
import styles from './styles.module.scss'
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, Fade, Modal, Slide, Tooltip } from '@mui/material';
import { BiEditAlt, BiMessageDetail } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';
import React, { useState } from 'react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

import * as Yup from 'yup';

import Carousel from 'react-material-ui-carousel';

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


const ListProducts = ({ products, setProducts }) => {

    const [openReviewImages, setOpenReviewImages] = useState(false);
    const [indexProduct, setIndexProduct] = useState(null);
    const [productImages, setProductImages] = useState([]);

    const handleCancelModalReviewImages = () => {
        setOpenReviewImages(false);
        setIndexProduct(null);
    };

    const handleOpenModalReviewImages = (productImages) => {
        console.log("productImages -->", productImages);
        setOpenReviewImages(true);
        // setIndexProduct(index);
        setProductImages(productImages);
    };

    console.log("productImages -->", productImages);

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

    const handlerRemoveItem = async (id, coupon) => {
        try {
            const { data } = await axios.delete("/api/admin/coupons", {
                data: { id, coupon },
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
            if (startDate.getDate() === endDate.getDate()) {
                return toast.error("Ngày bắt đầu và ngày kết thúc không được trùng nhau!");
            }
            else if (endDate.getTime() - startDate.getTime() < 0) {
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
    for (let item = 0; item < products.length; item++) {
        dataList.push({
            id: item + 1,
            item: products[item],
            name: products[item].name,
            category: products[item].category.name,
            subProducts: products[item].subProducts,
            createdAt: products[item].createdAt,
            updatedAt: products[item].updatedAt,
        })
    }

    const columns = [
        {
            field: 'id',
            renderHeader: () => (<p className={styles.table__header}>ID</p>),
            width: 55,
        },
        {
            field: 'name',
            renderHeader: () => (<p className={styles.table__header}>Tên Sản Phẩm</p>),
            width: 340,
            renderCell: (params) => (
                <Tooltip
                    title={<p style={{ fontSize: "16px", padding: "2px 4px" }}>{params.value}</p>}
                    enterDelay={100} leaveDelay={100}
                    arrow
                >
                    <p className={styles.product__name}>
                        {params.value.length > 43 ? `${params.value.substring(0, 43)}...` : params.value}
                    </p>
                </Tooltip>
            )
        },
        {
            field: 'subProducts',
            minWidth: 400,
            flex: 1,
            renderHeader: () => (<p className={styles.table__header}>Hình Ảnh Sản Phẩm</p>),
            renderCell: (params) => (
                <div className={styles.product__image}>
                    {params.row.subProducts.map((product, index) => (
                        <div
                            key={index}
                            className={styles.product__image__item}>
                            <img
                                src={product.images[0].url}
                                alt={product.images[0].url}
                            />
                            <div className={styles.shape}></div>
                            <Tooltip
                                title="Reviews"
                                arrow
                            >
                                <div className={styles.btn__review} onClick={() => handleOpenModalReviewImages(product.images)}>
                                    <AiOutlineEye />
                                </div>
                            </Tooltip>

                        </div>
                    ))}
                </div>
            )
        },
        {
            field: 'category',
            width: 150,
            renderHeader: () => (<p className={styles.table__header}>Danh Mục</p>),
            renderCell: (params) => (
                <Tooltip
                    title={<p style={{ fontSize: "16px", padding: "2px 4px" }}>{params.value}</p>}
                    enterDelay={100} leaveDelay={100}
                    arrow
                >
                    <p className={styles.product__category}>
                        {params.value.length > 17 ? `${params.value.substring(0, 17)}...` : params.value}
                    </p>
                </Tooltip>
            )
        },
        {
            field: 'item',
            renderHeader: () => (<p className={styles.table__header}>Hành động</p>),
            sortable: false,
            width: 290,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        size="small"
                        color='success'
                        style={{ textTransform: "capitalize", fontSize: "15px", padding: "7px 9px" }}
                        startIcon={<BiMessageDetail />}
                        onClick={() => showDialogDelete(params.value._id)}
                    >
                        Detail
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color='info'
                        style={{ marginLeft: 10, textTransform: "capitalize", fontSize: "15px", padding: "7px 9px" }}
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
                        variant="contained"
                        size="small"
                        color='error'
                        style={{ marginLeft: 10, textTransform: "capitalize", fontSize: "15px", padding: "7px 9px" }}
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
        <section className={styles.list__products}>
            <h2 className={styles.header} style={{ marginBottom: "1.8rem" }}>Danh sách sản phẩm</h2>

            <DataGrid
                rows={dataList}
                columns={columns}
                rowHeight={76}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20, 50, 100]}
                checkboxSelection
            />

            {/* <Modal
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
                            <IoIosCloseCircleOutline />
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
                                        <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", marginTop: "1.6rem" }}>
                                            <Button
                                                type='submit'
                                                variant="contained"
                                                size="large"
                                                color='info'
                                                style={{ textTransform: "capitalize" }}
                                                startIcon={<BiSave />}
                                            >
                                                Cập nhật
                                            </Button>
                                            <Button
                                                type='button'
                                                variant="outlined"
                                                size="large"
                                                color='inherit'
                                                style={{ textTransform: "capitalize" }}
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
            </Modal> */}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openReviewImages}
                onClose={handleCancelModalReviewImages}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openReviewImages}>
                    <Box sx={style} className={styles.modal__wrapper}>
                        <Carousel
                            autoPlay={false}    
                            cycleNavigation={true}
                            fullHeightHover={true}
                            animation="slide"
                        >
                            {   productImages.map((img, index) => (
                                    <div className={styles.review__img} key={index}>
                                        <img src={img.url} alt="" />
                                    </div>
                                ))
                            }
                        </Carousel>
                    </Box>
                </Fade>
            </Modal>
        </section>
    )
}

export default ListProducts;