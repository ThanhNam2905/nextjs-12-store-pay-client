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
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react';
import axios from 'axios';
import BarLoaderSpinner from '../components/shared/loaders/barLoader';
import { useRouter } from 'next/router';

const initialValues = {
    login__email: '',
    login__password: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    success: '',
    error: '',
    login_error: '',
}


const SignInPage = ({ providers, callbackUrl, csrfToken }) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(initialValues);
    const { 
        login__email, 
        login__password,
        username,
        email,
        password,
        confirm_password,
        success,
        error,
        login_error,
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
        login__email: Yup.string()
            .required("Vui lòng điền địa chỉ email của bạn")
            .email("Vui lòng nhập đúng định dạng email cho hợp lệ"),
        login__password: Yup.string()
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

    // Feature Sign UP Handle.
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

            setTimeout(async () => {
                let options = {
                    redirect: false,
                    email: email,
                    password: password,
                };
        
                const res = await signIn('credentials', options);
                router.push("/");
            }, 1500);
        } catch (error) {
            setLoading(false);
            setUser({ ...user, error: error.response.data.message, success: '' });
        }
    }

    // Feature Sign IN Handle.
    const signInHandle = async() => {
        setLoading(true);

        let options = {
            redirect: false,
            email: login__email,
            password: login__password,
        };

        const res = await signIn('credentials', options);
        setUser({ ...user, success: '', error: ''});
        setLoading(false);

        if(res?.error) {
            setLoading(false);
            setUser({ ...user, login_error: res?.error});
        }
        else {
            router.push(callbackUrl || "/");
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
                                login__email,
                                login__password,
                            }}
                            validationSchema={signInValidation}
                            onSubmit={() => {
                                signInHandle()
                            }}
                        >
                            {(form) => (
                                    <Form
                                        method='post'
                                        action="/api/auth/signin/email"
                                    >
                                        <input type="hidden" name='csrfToken' defaultValue={csrfToken}/>
                                        <SigninInput 
                                            type='text'
                                            name='login__email'
                                            icon='email' 
                                            placeholder='Địa chỉ email'
                                            onChange={handlerChangeInput}
                                        />
                                        <SigninInput 
                                            type='password'
                                            name='login__password'
                                            icon='password' 
                                            placeholder='Mật khẩu'
                                            onChange={handlerChangeInput}
                                        />
                                        <CircleIConButton type="submit" text="Đăng nhập"/>
                                        {
                                            login_error && (
                                                <div className={styles.message}>
                                                    <span className={styles.message__error}>
                                                        {login_error}
                                                    </span>
                                                </div>
                                            )
                                        }
                                        <div className={styles.forgotPassword}>
                                            <Link href="/auth/forgot-password" className={styles.forgotPassword__wrapper}>
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
                                    providers.map((provider) => {
                                        if(provider === 'Credentials') {
                                            return;
                                        }
                                        else {
                                            return (
                                                <div key={provider.id}>
                                                        {
                                                            provider.name !== "Credentials" ? (
                                                                <button
                                                                    className={styles.social__btn}
                                                                    onClick={() => signIn(provider.id)}
                                                                >
                                                                    <img src={`./../icons/${provider.id}.png`} alt={provider.name} />
                                                                    <span>Đăng nhập với {provider.name}</span>
                                                                </button>
                                                            ) : ""
                                                        }
                                                </div>
                                            );
                                        }
                                    })
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

export default SignInPage;

export async function getServerSideProps(context) {
    const { req, query } = context;
    const session = await getSession({ req });
    const { callbackUrl } = query;

    if(session) {
        return {
            redirect: {
                destination: callbackURL,
            },
        };
    }

    const csrfToken = await getCsrfToken(context);

    const providers = Object.values(await getProviders());

    return {
        props: {
            providers,
            csrfToken,
            callbackUrl,
        },
    };
}