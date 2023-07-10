import axios from 'axios'
import Footer from '../components/footer'
import Header from '../components/header'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home({ country }) {
    const { data: session } = useSession();
    console.log("session ===> ", session);

    return (
        <div>
            <Header country={country}/>
            <Footer country={country}/>
        </div>
    )

    
    // if (session) {
    //     return <>
    //         Signed in as {session.user.email} <br />
    //         <button onClick={() => signOut()}>Sign out</button>
    //     </>
    // }
    // return <>
    //     Not signed in <br />
    //     <button onClick={() => signIn()}>Sign in</button>
    // </>
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
