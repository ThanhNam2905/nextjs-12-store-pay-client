import React, { useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from '../styles/signIn.module.scss';
import { BiChevronLeft } from 'react-icons/bi';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import SigninInput from '../components/shared/inputs/signin-input';
import * as Yup from 'yup';
import CircleIConButton from '../components/shared/buttons/circleIconBtn';
import { getProviders, signIn } from 'next-auth/react';
import axios from 'axios';
import BarLoaderSpinner from '../components/shared/loaders/barLoader';
import { useRouter } from 'next/router';

const initialValues = {
    signIn__email: '',
    signIn__password: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    success: '',
    error: '',
}


const SignIn = ({ providers }) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(initialValues);
    const { 
        signIn__email, 
        signIn__password,
        username,
        email,
        password,
        confirm_password,
        success,
        error,
    } = user;

    const handlerChangeInput = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    // Validation Input use Yup, Formik
    const signInValidation = Yup.object({
        signIn__email: Yup.string()
            .required("Vui lòng điền địa chỉ email của bạn")
            .email("Vui lòng nhập đúng định dạng email cho hợp lệ"),
        signIn__password: Yup.string()
            .required("Vui lòng điền mật khẩu của bạn")
    })
    const signUpValidation = Yup.object({
        username: Yup.string()
            .required("Vui lòng nhập họ tên của bạn")
            .min(3, "Họ tên của bạn phải có ít nhất 3 ký tự")
            .max(20, "Họ tên của bạn tối đa không quá 20 ký tự")
            .matches(/^[aA-zZ]/, "Họ tên chỉ bao gồm các ký tự và số, không được có các ký tự đặt biệt"),
        email: Yup.string()
            .required("Vui lòng nhập email của bạn để đăng ký")
            .email("Vui lòng nhập đúng định dạng email cho hợp lệ"),
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu gồm ít nhất 1 ký tự chữ in hoa, chữ thường và 1 số")
            .min(6, "Vui lòng nhập ít nhất 6 ký tự")
            .max(32, "Vui lòng nhập tối đa 32 ký tự"),
        confirm_password: Yup.string()
            .required("Vui lòng nhập lại mật khẩu của bạn")
            .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không trùng khớp")
    })

    // Feature Sign Up Handle.
    const signUpHandle = async() => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/auth/signup", {
                username,
                email,
                password,
            });

            setUser({ ...user, success: data.message, error: '' });
            setLoading(false);

            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch (error) {
            setLoading(false);
            setUser({ ...user, error: error.response.data.message, success: '' });
        }
    }

    return (
        <>
            {/* Spinner Loading */}
            { loading && <BarLoaderSpinner loading={loading}/> }

            <Header country="Viet Nam"/>
            <main className={styles.signin}>
                <div className={styles.signin__container}>
                    <div className={styles.signin__header}>
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
                            Đăng nhập
                        </span>
                    </div>
                    <div className={styles.signin__form}>
                        <h2>Đăng nhập</h2>
                        <p>
                            Đăng nhập thành viên <b>StorePay</b> để nhận nhiều những chương trình ưu đãi hấp dẫn.
                        </p>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                signIn__email,
                                signIn__password,
                            }}
                            validationSchema={signInValidation}
                        >
                            {(form) => (
                                    <Form>
                                        <SigninInput 
                                            type='text'
                                            name='signIn__email'
                                            icon='email' 
                                            placeholder='Địa chỉ email'
                                            onChange={handlerChangeInput}
                                        />
                                        <SigninInput 
                                            type='password'
                                            name='signIn__password'
                                            icon='password' 
                                            placeholder='Mật khẩu'
                                            onChange={handlerChangeInput}
                                        />
                                        <CircleIConButton type="submit" text="Đăng nhập"/>
                                        <div className={styles.forgotPassword}>
                                            <Link href="/forgot" className={styles.forgotPassword__wrapper}>
                                                Quên mật khẩu ?
                                            </Link>
                                        </div>  
                                    </Form>
                                )
                            }
                        </Formik>
                        <div className={styles.signIn__socials}>
                            <span className={styles.heading}>
                                Hoặc đăng nhập với
                            </span>
                            <div className={styles.signIn__socials__wrapper}>
                                {
                                    providers.map((provider) => (
                                        <div key={provider.id}>
                                            <button
                                                className={styles.social__btn}
                                                onClick={() => signIn(provider.id)}
                                            >
                                                <img src={`./../icons/${provider.id}.png`} alt={provider.name} />
                                                Đăng nhập với {provider.name}
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.signin__container}>
                    <div className={styles.signin__form}>
                        <h2>Đăng ký</h2>
                        <p>
                            Trở thành thành viên <b>StorePay</b>
                            để nhận nhiều những chương trình ưu đãi hấp dẫn,
                        </p>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                username,
                                email,
                                password,
                                confirm_password,
                            }}
                            validationSchema={signUpValidation}
                            onSubmit={() => {
                                signUpHandle();
                            }}
                        >
                            {(form) => (
                                    <Form>
                                        <SigninInput 
                                            type='text'
                                            name='username'
                                            icon='user' 
                                            placeholder='Họ tên'
                                            onChange={handlerChangeInput}
                                        />
                                        <SigninInput 
                                            type='text'
                                            name='email'
                                            icon='email' 
                                            placeholder='Đại chỉ email'
                                            onChange={handlerChangeInput}
                                        />
                                        <SigninInput 
                                            type='password'
                                            name='password'
                                            icon='password' 
                                            placeholder='Mật khẩu'
                                            onChange={handlerChangeInput}
                                        />
                                        <SigninInput 
                                            type='password'
                                            name='confirm_password'
                                            icon='password' 
                                            placeholder='Xác nhận mật khẩu'
                                            onChange={handlerChangeInput}
                                        />
                                        <CircleIConButton type="submit" text="Đăng ký"/>
                                    </Form>
                                )
                            }
                        </Formik>
                        <div className={styles.message}>
                            { success && (<span className={styles.message__success}>{success}</span>) }
                        </div>
                        <div className={styles.message}>
                            { error && (<span className={styles.message__error}>{error}</span>) }
                        </div>
                    </div>
                </div>
            </main>
            <Footer country="Viet Nam"/>
        </>
    )
}

export default SignIn;

export async function getServerSideProps(context) {
    const providers = Object.values(await getProviders());

    return {
        props: {
            providers,
        },
    };
}