import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from '../styles/signIn.module.scss';
import { BiChevronLeft } from 'react-icons/bi';
import Link from 'next/link';

const signin = () => {
    return (
        <>
            <Header country="Viet Nam"/>
            <main className={styles.signin}>
                <div className={styles.signin__container}>
                    <div className={styles.signin__header}>
                        <div className={styles.iconBack}>
                            <BiChevronLeft/>
                        </div>
                        <span>
                            Rất vui khi được tham gia cùng chúng tôi
                            <Link href={"/"}>
                                Go to Store
                            </Link>
                        </span>
                    </div>
                    <p>
                            Trở thành thành viên <span>StorePay</span>
                            để nhận nhiều những chương trình ưu đãi hấp dẫn,
                        </p>
                </div>
            </main>
            <Footer country="Viet Nam"/>
        </>
    )
}

export default signin