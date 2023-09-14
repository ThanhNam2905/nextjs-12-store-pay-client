import { DataGrid } from '@mui/x-data-grid';
import styles from './styles.module.scss'
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, Fade, Modal, Slide, Tooltip } from '@mui/material';
import { BiEditAlt, BiSave } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineClockCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';
import React, { useState } from 'react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Form, Formik } from 'formik';
import AdminInput from '../../shared/inputs/admin-input';
import * as Yup from 'yup';

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


const ListCategories = ({ categories, setCategories }) => {
    // =======================================================
    // Handler remove item category function.
    const [openDeleteItem, setOpenDeleteItem] = useState(false);
    const [indexCategory, setIndexCategory] = useState(null);
    
    const handleCancelDelete = () => {
        setOpenDeleteItem(false);
        setIndexCategory(null);
        setName("");
    };

    const showDialogDelete = (key) => {
        setOpenDeleteItem(true);
        setIndexCategory(key);
    };

    const handlerRemoveItem = async(id, name) => {
        try {
            const { data } = await axios.delete("/api/admin/categories", {
                data: {id, name},
            });
            setCategories(data.categories);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    // =======================================================


    // =======================================================
    // Handler update item category function.
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");
    const [itemEdit, setItemEdit] = useState("");

    const handleOpenModalEditItem = (id, name) => {
        setOpenModal(true);
        setName(name);
        setItemEdit(id);        
    };

    const handleCancelModalEditItem = () => {
        setOpenModal(false);
        setName("");       
    };

    const validate = Yup.object({
        name: Yup.string()
            .required("Vui lòng điền tên danh mục!")
            .min(3, "Tên danh mục phải gồm 3 đến 50 ký tự!")
            .max(50, "Tên danh mục phải gồm 3 đến 50 ký tự!")
        ,
    });

    const handlerSubmitEditItem = async (id) => {
        try {
            const { data } = await axios.put("/api/admin/categories", {
                id,
                name: name.trim(),
            });
            setCategories(data.categories);
            setOpenModal(false);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    // =======================================================

    const dataList = [];
    for (let item = 0; item < categories.length; item++) {
        dataList.push({
            id: item + 1,
            item: categories[item],
            name: categories[item].name,
            createdAt: categories[item].createdAt,
            updatedAt: categories[item].updatedAt,
        })
    }

    const columns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 70, 
        },
        { 
            field: 'name', 
            headerName: 'Tên Danh Mục', 
            flex: 1 
        },
        { 
            field: 'createdAt', 
            headerName: "Ngày tạo",
            width: 150,
            renderCell: (params) => (
                <Tooltip 
                    title={<p style={{ fontSize: "15px", padding: "2px"}}>
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
                        onClick={() => handleOpenModalEditItem(params.value._id, params.value.name)} 
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color='error'
                        style={{ marginLeft: 16, textTransform: "capitalize" }}
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
                            Bạn có muốn xóa danh mục: <b>{params.value.name}</b> này không?
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
        <section className={styles.list__categories}>
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
                        <div className={styles.header}>Chỉnh sửa danh mục</div>
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
                                handlerSubmitEditItem(itemEdit)
                            }}
                        >
                            {
                                (formik) => (
                                    <Form>
                                        <AdminInput
                                            type="text"
                                            label="Tên Danh Mục"
                                            name="name"
                                            value={name}
                                            placeholder="Tên danh mục..."
                                            onChange={(e) => setName(e.target.value)}
                                        />
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
                                                onClick={handleCancelModalEditItem}
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

export default ListCategories;