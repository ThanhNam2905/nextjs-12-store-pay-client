import React, { useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import styles from './../../styles/forgotPassword.module.scss';
import { BiChevronLeft } from 'react-icons/bi';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import SigninInput from '../../components/shared/inputs/signin-input';
import CircleIConButton from '../../components/shared/buttons/circleIconBtn';
import * as Yup from 'yup';
import axios from 'axios';
import BarLoaderSpinner from '../../components/shared/loaders/barLoader';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Validation forgotPassword use Yup, Formik
    const forgotPasswordValidation = Yup.object({
        email: Yup.string()
            .required("Vui lòng điền địa chỉ email của bạn")
            .email("Vui lòng nhập đúng định dạng email cho hợp lệ")
    });

    // Functionality ForgotPassword Handle.
    const forgotPasswordHandle = async() => {
        try {
            setLoading(true);

            const { data } = await axios.post("/api/auth/forgot-password", {
                email,
            });
            setError("");
            setEmail("");
            setSuccess(data.message);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
            setSuccess("")
        }
    }

    return (
        <>
            {/* Spinner Loading */}
            { loading && <BarLoaderSpinner loading={loading}/> }

            <Header country="Viet Nam"/>
                <main className={styles.forgotPassword}>
                    <div className={styles.forgotPassword__header}>
                            <div className={styles.iconBack}>
                                <BiChevronLeft/>
                            </div>
                            <span>
                                <Link href={"/"}>
                                    Quay lại trang chủ
                                </Link>
                            </span>
                            <span>/</span>
                            <span>
                                Quên mật khẩu
                            </span>
                        </div>
                    <div className={styles.forgotPassword__container}>
                        <div className={styles.forgotPassword__form}>
                            <div className={styles.heading}>
                                <h2>Quên mật khẩu</h2>
                                <p>
                                    Nhập thông tin email để lấy lại mật khẩu của bạn
                                </p>
                            </div>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    email,
                                }}
                                validationSchema={forgotPasswordValidation}
                                onSubmit={() => {
                                    forgotPasswordHandle()
                                }}
                            >
                                {(form) => (
                                        <Form>
                                            <SigninInput
                                                type='text'
                                                name='email'
                                                icon='email' 
                                                placeholder='Địa chỉ email'
                                                onChange={(event) => setEmail(event.target.value)}
                                            />
                                            <CircleIConButton type="submit" text="Gửi liên kết"/>
                                            {error && (
                                                    <div className={styles.message}>
                                                        <span className={styles.message__error}>
                                                            {error}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            {success && (
                                                    <div className={styles.message}>
                                                        <span className={styles.message__success}>
                                                            {success}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            <div className={styles.links}>
                                                <span>Bạn chưa có tài khoản?</span>
                                                <Link href="/signin" className={styles.link}>
                                                    Đăng ký tài khoản tại đây
                                                </Link>
                                            </div>  
                                        </Form>
                                    )
                                }
                            </Formik>
                        </div>
                    </div>
                </main>
            <Footer country="Viet Nam"/>
        </>
    )
}

export default ForgotPassword