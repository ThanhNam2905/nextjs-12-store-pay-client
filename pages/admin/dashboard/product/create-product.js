import styles from '../../../../styles/admin/products.module.scss'
import AdminLayout from '../../../../components/admin/layout';
import db from '../../../../utils/database';
import Product from '../../../../models/ProductModel';
import Category from '../../../../models/CategoryModel';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { SingularSelect } from '../../../../components/shared/selects/singular-select';
import MultipleSelect from '../../../../components/shared/selects/multiple-select';
import AdminInput from '../../../../components/shared/inputs/admin-input';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../../../store/dialogSlice';
import { Images } from '../../../../components/admin/create-product/images';
import { Colors } from '../../../../components/admin/create-product/colors';
import { Style } from '../../../../components/admin/create-product/style';
import { Sizes } from '../../../../components/admin/create-product/click-to-add/sizes';
import { Details } from '../../../../components/admin/create-product/click-to-add/details';
import { Questions } from '../../../../components/admin/create-product/click-to-add/questions';
import { validateCreateProduct } from '../../../../utils/validation';
import dataURItoBlob from '../../../../utils/dataURItoBlob';
import { uploadImages } from '../../../../requests/uploadImages';
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    description: "",
    brand: "",
    sku: "",
    discount: 0,
    images: [],
    description_images: [],
    parent: "",
    category: "",
    subCategories: [],
    color: {
        color: "",
        image: "",
    },
    sizes: [
        {
            size: "",
            qty: "",
            price: "",
        },
    ],
    details: [
        {
            name: "",
            value: "",
        },
    ],
    questions: [
        {
            question: "",
            answer: "",
        },
    ],
    shipping: 0,
};

const CreateProductPage = ({parents, categories}) => {

    const [product, setProduct] = useState(initialState);
    const [subs, setSubs] = useState([]);
    const [images, setImages] = useState([]);
    const [colorImage, setColorImage] = useState("");
    const [description_images, setDescription_images] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getParentData = async() => {
            const {data} = await axios.get(`/api/product/${product.parent}`);
            if(data) {
                setProduct({
                    ...product,
                    name: data.name,
                    description: data.description,
                    brand: data.brand,
                    category: data.category,
                    subCategories: data.subCategories,
                    details: [],
                    questions: [],
                });
            } 
        };
        getParentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.parent]);

    useEffect(() => {
        async function getSubCategories() {
            const {data} = await axios.get("/api/admin/sub-categories", {
                params: {
                    category: product.category,
                },
            });
            setSubs(data);
        }
        getSubCategories();
    }, [product.category]);

    const validateProduct = Yup.object({
        name: Yup.string()
            .required("Vui lòng điền tên sản phẩm!")
            .min(10, "Tên sản phẩm có độ dài từ 10 đến 300 ký tự")
            .max(300, "Tên sản phẩm có độ dài từ 10 đến 300 ký tự"),
        brand: Yup.string()
            .required("Vui lòng điền thương hiệu sản phẩm!")
            .min(3, "Tên sản phẩm có độ dài từ 3 đến 80 ký tự")
            .max(80, "Tên sản phẩm có độ dài từ 3 đến 80 ký tự"),
        description: Yup.string()
            .required("Vui lòng điền mô tả sản phẩm!"),
        category: Yup.string()
            .required("Vui lòng chọn danh mục chính!"),
        // subCategories: Yup.array()
        //     .min(1, "Vui lòng chọn ít nhất 1 danh mục phụ!"),
        sku: Yup.string()
            .required("Vui lòng điền sku/number!"),
        color: Yup.string()
            .required("Vui lòng điền màu sắc sản phẩm!"),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({...product, [name]: value});
    }

    // Handler Create new Product.
    const handlerSubmit = async() => {
        let test = validateCreateProduct(product, images);
        if(test === "valid") {
            createProductHandler();
        }
        else {
            dispatch(
                showDialog({
                    header: "Vui lòng điền đầy đủ thông tin sản phẩm!",
                    msgs: test,
                })
            )
        }
    };

    let upload_images = [];
    let upload_style_image = "";

    const createProductHandler = async() => {
        setLoading(true);

        if(images) {
            let temp = images.map((img) => {
                return dataURItoBlob(img);
            });

            const path = "product_images";
            let formData = new FormData();
            formData.append("path", path);
            temp.forEach((image) => {
                formData.append("file", image);
            })

            upload_images = await uploadImages(formData);
        }

        if(product.color.image) {
            let temp = dataURItoBlob(product.color.image);

            const path = "product_style_image";
            let formData = new FormData();
            formData.append("path", path);
            formData.append("file", temp);
            let cloudinary_style_image = await uploadImages(formData);

            upload_style_image = cloudinary_style_image[0].url;
        }

        try {
            const { data } = await axios.post("/api/admin/product", {
                ...product,
                images: upload_images,
                color: {
                    image: upload_style_image,
                    color: product.color.color,
                },
            });
            setLoading(false);
            toast.success(data.message);
        } catch (error) {
            setLoading(false);
            console.log("error ==>", error.response.data.message);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <AdminLayout>
                <main>
                    <h2 className={styles.header}>Tạo mới sản phẩm</h2>
                    
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: product.name,
                            brand: product.brand,
                            description: product.description,
                            category: product.category,
                            subCategories: product.subCategories,
                            parent: product.parent,
                            sku: product.sku,
                            color: product.color.color,
                            discount: product.discount,
                            sku: product.sku,
                            imageInputFile: "",
                            styleInput: "",
                        }}
                        validationSchema={validateProduct}
                        onSubmit={() => {
                            handlerSubmit()
                        }}
                    >
                        {
                            (formik) => (
                                <Form>
                                    <Images
                                        name="imageInputFile"
                                        header="Hình ảnh sản phẩm"
                                        textBtn="Upload Images"
                                        images={images}
                                        setImages={setImages}
                                        setColorImage={setColorImage}
                                    />
                                    <Colors
                                        name="color"
                                        header="Màu sắc sản phẩm"
                                        product={product}
                                        images={images}
                                        setProduct={setProduct}
                                        colorImage={colorImage}
                                    />

                                    { product.color.color && (
                                            <span 
                                                className={styles.color__span} 
                                                style={{ 
                                                    backgroundColor: `${product.color.color}`, 
                                                    outline: `2px solid ${product.color.color}`,
                                                    outlineOffset: "3px"
                                                }}
                                            ></span>
                                        )
                                    }

                                    <Style
                                        name="colorImageInput"
                                        product={product}
                                        header="Hình ảnh màu sắc sản phẩm"
                                        setProduct={setProduct}
                                        colorImage={colorImage}
                                        textBtn="Upload Image Color"
                                    />

                                    { product.color.image && (
                                            <img 
                                                src={product.color.image}
                                                className={styles.image__span} 
                                                alt="" 
                                            />
                                        )
                                    }
                                    
                                    <SingularSelect
                                        label="parent"
                                        name="parent"
                                        value={product.parent}
                                        placeholder="Chọn sản phẩm hiện có"
                                        header="Thêm vào sản phẩm hiện có"
                                        data={parents}
                                        handleChange={handleChange}
                                    />
                                    <SingularSelect
                                        label="category"
                                        name="category"
                                        placeholder="Danh Mục Chính"
                                        value={product.category}
                                        header="Loại danh mục chính"
                                        data={categories}
                                        handleChange={handleChange}
                                        // disabled={product.parent ? false : true}
                                    />
                                    { product.category && (
                                            <MultipleSelect
                                                value={product.subCategories}
                                                data={subs}
                                                header="Loại danh mục phụ"
                                                placeholder="Danh mục phụ"
                                                name="subCategories"
                                                // disabled={product.parent ? false : true}
                                                handleChange={handleChange}
                                            />
                                        )
                                    }
                                    <div className={styles.header}>Thông tin cơ bản</div>
                                    <AdminInput
                                        type="text"
                                        label="Tên sản phẩm"
                                        name="name"
                                        placeholder="Tên sản phẩm..."
                                        onChange={handleChange}
                                    />
                                    <AdminInput
                                        type="text"
                                        label="Mô tả sản phẩm"
                                        name="description"
                                        placeholder="Mô tả sản phẩm..."
                                        onChange={handleChange}
                                    />
                                    <AdminInput
                                        type="text"
                                        label="Thương hiệu sản phẩm"
                                        name="brand"
                                        placeholder="Thương hiệu sản phẩm..."
                                        onChange={handleChange}
                                    />
                                    <AdminInput
                                        type="text"
                                        label="SKU"
                                        name="sku"
                                        placeholder="SKU..."
                                        onChange={handleChange}
                                    />
                                    <AdminInput
                                        type="number"
                                        label="Discount"
                                        name="discount"
                                        placeholder="Discount..."
                                        onChange={handleChange}
                                    />
                                    <Sizes
                                        sizes={product.sizes}
                                        product={product}
                                        setProduct={setProduct}
                                    /> 
                                    <Details
                                        details={product.details}
                                        product={product}
                                        setProduct={setProduct}
                                    /> 
                                    <Questions
                                        questions={product.questions}
                                        product={product}
                                        setProduct={setProduct}
                                    />
                                    {/* <Images
                                        name="imageDescInputFile"
                                        header="Mô tả Hình Ảnh Sản Phẩm"
                                        text="Add Images"
                                        images={description_images}
                                        setImages={setDescription_images}
                                        setColorImage={setColorImage}
                                    /> */}
                                    <button 
                                        className={`${styles.btn} ${styles.btn__primary}`}
                                        type='submit'
                                    >
                                        Thêm sản phẩm
                                    </button>
                                </Form>
                            )
                        }
                    </Formik>
                </main>
            </AdminLayout>
        </>
    )
}

export default CreateProductPage;

export async function getServerSideProps(context) {
    await db.connectDB();
    const results = await Product.find().select("name subProducts").lean();
    const categories = await Category.find().lean();
    await db.disconnectDB();
    return {
        props: {
            parents: JSON.parse(JSON.stringify(results)),
            categories: JSON.parse(JSON.stringify(categories)),
        }
    };
}