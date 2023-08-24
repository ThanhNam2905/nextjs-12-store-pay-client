import React, { useState } from 'react'
import Header from './../../../components/header'
import Footer from './../../../components/footer'
import styles from './.././../../styles/forgotPassword.module.scss';
import { BiChevronLeft } from 'react-icons/bi';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import SigninInput from './../../../components/shared/inputs/signin-input/signin-input';
import CircleIConButton from './../../../components/shared/buttons/circleIconBtn';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import BarLoaderSpinner from './../../../components/shared/loaders/barLoader';
import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';

const ResetPassword = ({ user_id }) => {

    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_Password] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Validation resetPassword use Yup, Formik
    const resetPasswordValidation = Yup.object({
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu mới của bạn")
            .min(6, "Vui lòng nhập ít nhất 6 ký tự")
            .max(32, "Vui lòng nhập tối đa 32 ký tự"),
        confirm_password: Yup.string()
            .required("Vui lòng nhập lại mật khẩu của bạn")
            .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không trùng khớp")
    });

    // Functionality ResetPassword Handle.
    const resetPasswordHandle = async() => {
        try {
            setLoading(true);

            const { data }= await axios.put("/api/auth/reset-password", {
                user_id,
                password,
            });

            let options = {
                redirect: false,
                email: data.email,
                password: password,
            };
    
            await signIn('credentials', options);

            window.location.reload(true);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
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
                                Đặt lại mật khẩu
                            </span>
                        </div>
                    <div className={styles.forgotPassword__container}>
                        <div className={styles.forgotPassword__form}>
                            <div className={styles.heading}>
                                <h2>Đặt lại mật khẩu</h2>
                                <p>
                                    Nhập thông tin password để đặt lại mật khẩu của bạn
                                </p>
                            </div>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    password,
                                    confirm_password
                                }}
                                validationSchema={resetPasswordValidation}
                                onSubmit={() => {
                                    resetPasswordHandle()
                                }}
                            >
                                {(form) => (
                                        <Form>
                                            <SigninInput
                                                type='password'
                                                name='password'
                                                icon='password' 
                                                placeholder='Mật khẩu của bạn'
                                                onChange={(event) => setPassword(event.target.value)}
                                            />
                                            <SigninInput
                                                type='password'
                                                name='confirm_password'
                                                icon='password' 
                                                placeholder='Nhập lại mật khẩu của bạn'
                                                onChange={(event) => setConfirm_Password(event.target.value)}
                                            />
                                            <CircleIConButton type="submit" text="Đặt lại mật khẩu"/>
                                            {error && (
                                                    <div className={styles.message}>
                                                        <span className={styles.message__error}>
                                                            {error}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            <div className={styles.links}>
                                                <span>Bạn chưa có tài khoản?</span>
                                                <Link href="/" className={styles.link}>
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

export default ResetPassword;

export async function getServerSideProps(context) {
    const { query, req } = context;
    const token = query.token;
    const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);

    const session = await getSession({ req });
    if(session) {
        return {
            redirect: {
                destination: "/",
            }
        }
    }

    return {
        props: {
            user_id: user_id.id,
        }
    }
}