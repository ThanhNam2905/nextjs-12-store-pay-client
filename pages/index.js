import axios from 'axios'
import Footer from '../components/footer'
import Header from '../components/header'
import { useSession } from "next-auth/react"
import styles from './../styles/Home.module.scss';
import HomeMain from '../components/home/home-main';
import HomeFlasDeals from '../components/home/home-flasdeals';
import HomeCategory from '../components/home/home-category';
import { gamingSwiper, homeImprovSwiper, women_accessories, women_dresses, women_shoes, women_swiper } from './../data/home';
import { useMediaQuery } from 'react-responsive';
import ProductsSwiper from '../components/products-swiper';



export default function Home({ country }) {
    const { data: session } = useSession();
    const isTabletMedia = useMediaQuery({ query: "(max-width:864px)" });
    const isMobileMedia = useMediaQuery({ query: "(max-width:640px)" });

    return (
        <>
            <Header country={country}/>
            <main className={styles.home}>
                <div className={styles.container}>
                    <HomeMain/>
                    <HomeFlasDeals/>
                    <section className={styles.home__category}>
                        <HomeCategory 
                            header="women dresses" 
                            products={women_dresses}
                            backgroundColor="#27ae60"
                        />
                        {
                            !isTabletMedia && (
                                <HomeCategory 
                                    header="accessories women's" 
                                    products={women_accessories}
                                    backgroundColor="#833471"
                                />
                            )
                        }
                        {
                            isMobileMedia && (
                                <HomeCategory 
                                    header="accessories women's" 
                                    products={women_accessories}
                                    backgroundColor="#833471"
                                />
                            )
                        }
                        <HomeCategory 
                            header="shoes women's" 
                            products={women_shoes}
                            backgroundColor="#F79F1F"
                        />
                    </section>  
                    <ProductsSwiper 
                        products={women_swiper} 
                        header="Women's"
                        backgroundColor="#27ae60"
                    />
                    <ProductsSwiper 
                        products={gamingSwiper} 
                        header="Gaming Gear"
                        backgroundColor="#F79F1F"
                    />
                    <ProductsSwiper 
                        products={homeImprovSwiper} 
                        header="Home Improvement"
                        backgroundColor="#833471"
                    />
                </div>
            </main>
            <Footer country={country}/>
        </>
    )
};

export async function getServerSideProps() {
    let data = await axios.get("https://api.ipregistry.co/?key=6ebk44dgchur2fqr")
        .then((res) => {
            return res.data.location.country;
        }).catch((error) => {
            console.log(error);
        });

    return {
        props: {
            // country: { 
            //     name: data.name, 
            //     flag: data.flag.emojitwo, 
            // },
            country: {
                name: "Viet Nam",
                flag: "https://static.vecteezy.com/system/resources/thumbnails/016/328/942/small_2x/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png",
            },
        }
    };
}
