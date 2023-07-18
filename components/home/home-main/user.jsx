import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { LiaClipboardListSolid } from "react-icons/lia";
import { AiOutlineHeart, AiOutlineMessage, AiOutlineSetting } from 'react-icons/ai';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards, Navigation } from 'swiper/modules';

import styles from './styles.module.scss';
import { userMenuArray } from '../../../data/home';

const HomeMainUser = () => {

    const { data: session } = useSession();

    return (
        <div>
            <img 
                src="./../../../images/userHeader.jpg" 
                alt="" 
                className={styles.user__header}
            />
            <div className={styles.user__container}>
                {
                    session ? (
                        <div className={styles.user__info}>
                            <img src={session?.user?.image} alt={session?.user?.image} />
                            <h4>{session?.user?.username}</h4>
                        </div>
                    ) : (
                        <div className={styles.user__info}>
                            <img 
                                src="https://res.cloudinary.com/nam290596/image/upload/v1689180536/nextjs-12-store-pay/3607444_fgmhvj.png" 
                                alt=""
                                className={styles.user__header} 
                            />
                            <div className={styles.user__info__btns}>
                                <button>Đăng ký</button>
                                <button>Đăng nhập</button>
                            </div>
                        </div>
                    )
                }
                <ul className={styles.user__links}>
                    <li>
                        <Link href="/profile">
                            <AiOutlineSetting />
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile">
                            <LiaClipboardListSolid />
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile">
                            <AiOutlineMessage />
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile">
                            <AiOutlineHeart />
                        </Link>
                    </li>
                </ul>
                <div className={styles.user__swiper}>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        navigation={true}
                        modules={[EffectCards, Navigation]}
                        className="userMenu_swiper"

                    >
                        {
                            userMenuArray.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <Link href={"/"}>
                                        <img src={item.image} alt="" />
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                        
                        
                    </Swiper>
                </div>
            </div>
            <img 
                src="./../../../images/userHeader.jpg" 
                alt="" 
                className={styles.user__footer}
            />
        </div>
    )
}

export default HomeMainUser