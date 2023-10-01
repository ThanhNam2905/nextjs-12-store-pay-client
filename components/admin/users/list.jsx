import { DataGrid } from '@mui/x-data-grid';
import styles from './styles.module.scss'
import { Avatar, Backdrop, Box, Button, Dialog, DialogActions, DialogContent, Fade, Modal, Slide, Tooltip } from '@mui/material';
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


const ListUsers = ({ users, setUsers }) => {
    // =======================================================
    // Handler remove item user function.
    const [openDeleteItem, setOpenDeleteItem] = useState(false);
    const [indexUser, setIndexUser] = useState(null);
    
    const handleCancelDelete = () => {
        setOpenDeleteItem(false);
        setIndexUser(null);
    };

    const showDialogDelete = (key) => {
        setOpenDeleteItem(true);
        setIndexUser(key);
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
    // Handler update item user function.
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
    for (let item = 0; item < users.length; item++) {
        dataList.push({
            id: item + 1,
            item: users[item],
            name: users[item].name,
            email: users[item].email,
            image: users[item].image,
            role: users[item].role,
            emailVerified: users[item].emailVerified,
        })
    }

    const columns = [
        { 
            field: 'id', 
            headerName: <b>ID</b>, 
            headerClassName: 'cell__theme--header',
            width: 85, 
        },
        { 
            field: 'name', 
            headerName: <b>Tên User</b>,
            headerClassName: 'cell__theme--header',
            flex: 1,
        },
        { 
            field: 'email', 
            headerName: <b>Email User</b>,
            headerClassName: 'cell__theme--header',
            flex: 1,
        },
        { 
            field: 'image', 
            headerName: <b>Avatar User</b>,
            headerClassName: 'cell__theme--header',
            width: 100,
            renderCell: (params) => (
                <div>
                    <Avatar
                        alt={params.value}
                        src={params.value}
                        sx={{ width: 46, height: 46 }}
                    />
                </div>
            )
        },
        { 
            field: 'role', 
            headerName: <b>Phân Quyền</b>,
            headerClassName: 'cell__theme--header',
            width: 130,
            renderCell: (params) => (
                <p style={{ textTransform: "capitalize" }}>{params.value}</p>
            )
        },
        { 
            field: 'emailVerified', 
            headerName: <b>Xác Thực Email</b>,
            headerClassName: 'cell__theme--header',
            width: 160,
            renderCell: (params) => (
                <div>
                    { params.value ? (
                        <em>Đã xác minh</em>
                        ) : (
                            <em>Chưa xác minh</em>
                        )
                    }
                </div>
            )
        },
        {
            field: 'item',
            headerName: <b>Actions</b>,
            headerClassName: 'cell__theme--header',
            sortable: false,
            width: 210,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="outlined"
                        size="small"
                        color='error'
                        style={{ textTransform: "capitalize" }}
                        startIcon={<AiOutlineDelete />}
                        onClick={() => showDialogDelete(params.value._id)}
                    >
                        Remove
                    </Button>
                    <Dialog
                        open={params.value._id === indexUser ? openDeleteItem : false}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCancelDelete}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogContent sx={{ padding: 4, paddingBottom: 0 }}> 
                            Bạn có muốn xóa user: <b>{params.value.name}</b> này không?
                        </DialogContent>
                        <DialogActions sx={{ margin: 2 }}>
                            <Button 
                                onClick={() => handlerRemoveItem(params.value._id, params.value.name)}
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
        <section className={styles.list__users}>
            <Box
                sx={{
                    width: '100%',
                    '& .cell__theme--header': {
                        backgroundColor: '#0980c0',
                        color: "#fff",

                    },
                    '& .css-yrdy0g-MuiDataGrid-columnHeaderRow': {
                        backgroundColor: '#0980c0',
                    },
                }}
            >
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
            </Box>
            
        </section>
    )
}

export default ListUsers;