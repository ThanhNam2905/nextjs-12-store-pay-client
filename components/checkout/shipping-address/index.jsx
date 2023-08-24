import { useState } from 'react';
import styles from './styles.module.scss';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CheckoutInput } from '../../shared/inputs/checkout-input';
import { LocationsSelect } from '../../shared/selects/locations-select';
import axios from 'axios';
import { saveShippingAddress } from '../../../requests/user';
import { FaIdCard, FaPhoneAlt, FaMapMarkerAlt, FaMapMarkedAlt, FaPlus } from "react-icons/fa"
import { IoIosArrowDropupCircle } from "react-icons/io";

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
    selectedAddress, 
    setSelectedAddress, 
    user,
    locations
}) => {

    const [addresses, setAddresses] = useState(user?.address || []);
    const [shipping, setShipping] = useState(initialValues);
    const {
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

    const handleChange = async(e) => {
        const { name, value } = e.target;
        setShipping({...shipping, [name]: value});

        if(name === "city" 
            && locations.length > 0) {
            let province =  await locations.find((item) => item.name_with_type === value);
            
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
        if(name === "districts" 
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

    const saveShippingAddressHandler = async() => {
        const res = await saveShippingAddress(shipping, user._id);
        
        setAddresses([...addresses, res]);
        setSelectedAddress(res);
    };

    return (
        <div className={styles.shipping__address}>
            <div className={styles.addresses}>
                { addresses.map((address) => (
                    <div 
                        className={`${styles.address} ${address.active && styles.active}`}
                        key={address._id}
                        >
                            <div className={styles.address__col}>
                                <FaIdCard/>
                                <span>
                                    Họ tên:
                                    <span>{address.fullname}</span>
                                </span>
                            </div>
                            <div className={styles.address__col}>
                                <FaPhoneAlt/>
                                <span>
                                    Số điện thoại:
                                    <span>{address.number_phone}</span>
                                </span>
                            </div>
                            <div className={styles.address__col}>
                                <FaMapMarkedAlt/>
                                <span>
                                    Địa chỉ cụ thể:
                                    <span>{address.specific_address}</span>
                                </span>
                            </div>
                            <div className={styles.address__col}>
                                <FaMapMarkerAlt/>
                                <span>
                                    Địa chỉ:
                                    <span>{address.wards}, {address.districts}, {address.city}</span>
                                </span>
                            </div>
                            <span className={styles.active__text} style={{ display: `${!address.active && 'none'}`}}>Chọn làm mặc định</span>
                    </div>
                )) }
            </div>

            <button className={styles.hide__show} onClick={() => setVisible(!visible)}>
                { visible ? (
                    <span>
                        <IoIosArrowDropupCircle style={{ fontSize: "1.8rem", fill: "#222"}} />
                    </span>
                ) : (
                    <span>
                        <FaPlus/>
                        Thêm địa chỉ mới
                    </span>
                )}
            </button>
            {/* {
                visible ?
            } */}
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
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}
