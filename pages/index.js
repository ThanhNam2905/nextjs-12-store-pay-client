import axios from 'axios'
import Footer from '../components/footer'
import Header from '../components/header'
import { useSession } from "next-auth/react"
import styles from './../styles/Home.module.scss';
import HomeMain from '../components/home/home-main';
import HomeFlasDeals from '../components/home/home-flasdeals';

export default function Home({ country }) {
    const { data: session } = useSession();

    return (
        <>
            <Header country={country}/>
            <main className={styles.home}>
                <div className={styles.container}>
                    <HomeMain/>
                    <HomeFlasDeals/>
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
