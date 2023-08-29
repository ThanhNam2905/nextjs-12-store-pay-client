import { useState } from 'react';
import styles from './styles.module.scss';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CheckoutInput } from '../../shared/inputs/checkout-input';
import { LocationsSelect } from '../../shared/selects/locations-select';
import axios from 'axios';
import { changeActiveAddress, deleteAddress, saveShippingAddress } from '../../../requests/user';
import { FaIdCard, FaPhoneAlt, FaMapMarkerAlt, FaMapMarkedAlt, FaPlus } from "react-icons/fa"
import { IoRemoveCircleOutline } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";

const initialValues = {
    fullname: "",
    number_phone: "",
    specific_address: "",
    city: "",
    districts: "",
    wards: "",
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const ShippingAddress = ({
    user,
    locations,
    addresses,
    setAddresses,
}) => {

    
    const [shipping, setShipping] = useState(initialValues);
    let {
        fullname,
        number_phone,
        specific_address,
        city,
        districts,
        wards,
    } = shipping;

    const [visible, setVisible] = useState(user?.address.length ? false : true);

    const validate = Yup.object({
        fullname: Yup.string()
            .required("Vui lòng điền họ và tên của bạn")
            .min(4, "Họ của bạn phải có ít nhất 4 ký tự trở lên")
            .max(56, "Họ của bạn chỉ có tối đa 56 ký tự trở xuống"),
        number_phone: Yup.string()
            .matches(phoneRegExp, 'Số điện thoại của bạn không hợp lệ')
            .required("Vui lòng điền số điện thoại của bạn")
            .min(9, "Số điện thoại của bạn nên phải chứa từ 9-10 ký tự")
            .max(10, "Số điện thoại của bạn nên phải chứa từ 9-10 ký tự"),
        specific_address: Yup.string()
            .required("Vui lòng điền địa chỉ cụ thể nơi bạn ở")
            .min(10, "Địa chỉ cụ thể nên phải chứa từ 10-70 ký tự")
            .max(70, "Địa chỉ cụ thể nên phải chứa từ 10-70 ký tự"),
        city: Yup.string()
            .required("Vui lòng chọn thành phố nơi bạn ở"),
        districts: Yup.string()
            .required("Vui lòng chọn quận/huyện nơi bạn ở"),
        wards: Yup.string()
            .required("Vui lòng chọn phường/xã nơi bạn ở"),
    });

    const [dataDistricts, setDataDistricts] = useState([]);
    const [dataWards, setDataWards] = useState([]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setShipping({ ...shipping, [name]: value });

        if (name === "city"
            && locations.length > 0) {
            let province = await locations.find((item) => item.name_with_type === value);

            let data = await axios.get(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${province.code}&limit=-1`)
                .then((response) => {
                    return response.data.data.data;
                })
                .catch((error) => {
                    console.log("error", error);
                });

            setDataDistricts(data);
            setDataWards([]);
        }
        if (name === "districts"
            && locations.length > 0
            && dataDistricts.length > 0) {
            let district = await dataDistricts.find((item) => item.name_with_type === value);

            let data = await axios.get(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${district.code}&limit=-1`)
                .then((response) => {
                    return response.data.data.data;
                })
                .catch((error) => {
                    console.log("error", error);
                });

            setDataWards(data);
        }
    };

    const saveShippingAddressHandler = async () => {
        const res = await saveShippingAddress(shipping);
        setAddresses(res.addresses);
        setVisible(!visible);
        // fullname = "";
        // number_phone = "";
        // specific_address = "";
        // city = "";
        // districts = "";
        // wards = "";
    };

    const changeActiveHandler = async(id) => {
        const res = await changeActiveAddress(id);
        setAddresses(res.addresses);
    }

    const deleteAddressHandler = async(id) => {
        const res = await deleteAddress(id);
        setAddresses(res.addresses);
    }

    return (
        <div className={styles.shipping__address}>
            <div className={styles.shipping__address__header}>
                <MdOutlineLocalShipping/>
                <h2>Thông tin vận chuyển</h2>
            </div>
            <div className={styles.addresses}>
                {addresses.map((address, index) => (
                    <div key={index} style={{ position: "relative"}}>
                        <div 
                            className={styles.address__delete} 
                            title='Delete'
                            onClick={() => deleteAddressHandler(address._id)}
                        >
                            <IoRemoveCircleOutline/>
                        </div>
                        <div
                            className={`${styles.address__wrapper} ${address.active && styles.active}`}
                            onClick={() => changeActiveHandler(address._id)}
                        >
                            <div className={styles.address__col}>
                                <FaIdCard />
                                <span>
                                    Họ tên:
                                    <span>{address.fullname}.</span>
                                </span>
                            </div>
                            <div className={styles.address__col}>
                                <FaPhoneAlt />
                                <span>
                                    Số điện thoại:
                                    <span>{address.number_phone}</span>
                                </span>
                            </div>
                            <div className={styles.address__col}>
                                <FaMapMarkedAlt />
                                <span>
                                    Địa chỉ cụ thể:
                                    <span>{address.specific_address}.</span>
                                </span>
                            </div>
                            <div className={styles.address__col}>
                                <FaMapMarkerAlt />
                                <span>
                                    Địa chỉ:
                                    <span>{address.wards}, {address.districts}, {address.city}.</span>
                                </span>
                            </div>
                            <span 
                                className={styles.active__text} 
                                style={{ 
                                    display: `${!address.active ? "none": "block"}`
                                }}
                            >
                                Địa chỉ mặc định
                            </span>
                    </div>
                    </div>
                ))}
            </div>

            
                {!visible && (
                    <button className={styles.hide__show} onClick={() => setVisible(!visible)}>
                        <span>
                            <FaPlus />
                            Thêm địa chỉ mới
                        </span>
                    </button>
                )}
            {
                visible && (
                    <Formik
                        enableReinitialize
                        initialValues={{
                            fullname,
                            number_phone,
                            specific_address,
                            city,
                            districts,
                            wards,
                        }}
                        validationSchema={validate}
                        onSubmit={() => saveShippingAddressHandler()}
                    >
                        {
                            (formik) => (
                                <Form>
                                    <div className={styles.col}>
                                        <CheckoutInput
                                            name="fullname"
                                            placeholder="Họ tên của bạn"
                                            onChange={handleChange}
                                        />
                                        <CheckoutInput
                                            name="number_phone"
                                            placeholder="Số điện thoại"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className={styles.col}>
                                        <LocationsSelect
                                            name="city"
                                            value={city}
                                            placeholder="Chọn Tỉnh/Thành Phố"
                                            handleChange={handleChange}
                                            data={locations}
                                            disabled={false}
                                        />
                                        <LocationsSelect
                                            name="districts"
                                            value={districts}
                                            placeholder="Chọn Quận/Huyện"
                                            handleChange={handleChange}
                                            data={dataDistricts}
                                            disabled={dataDistricts.length === 0 ? true : false}
                                        />
                                        <LocationsSelect
                                            name="wards"
                                            value={wards}
                                            placeholder="Chọn Phường/Xã"
                                            handleChange={handleChange}
                                            data={dataWards}
                                            disabled={dataWards.length === 0 ? true : false}
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <CheckoutInput
                                            name="specific_address"
                                            placeholder="Địa chỉ cụ thể"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <button type='submit' className={styles.btn__save__address}>Lưu địa chỉ giao hàng</button>
                                        { visible && (
                                            <button className={styles.hide__show} style={{ marginTop: "0" }} onClick={() => setVisible(!visible)}>
                                                Huỷ bỏ
                                            </button>
                                        )}
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                )
            }

        </div>
    )
}
