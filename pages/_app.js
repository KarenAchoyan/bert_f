import "@/styles/globals.css";
import {AdminProvider} from "../providers/AdminProvider";
import {useEffect, useState} from "react";
import {useRouter} from "next/dist/client/compat/router";
import Login from "./login";
import {NavBarProvider} from "../providers/NavBarContext";
import store from "../store/store";

function App({Component, pageProps}) {
    const router = useRouter();

    const isPageInAdminFolder = router.pathname.startsWith('/admin');

    function MyComp() {
        const [isToken, setIsToken] = useState(true)
        useEffect(() => {
            const access = localStorage.getItem('access_token') || "";
            if (access !== "") {
                setIsToken(true)
            } else {
                setIsToken(false)
            }
        }, [])
        return (
            <div>
                {isToken ?
                    <Component {...pageProps} />
                    : <Login/>}
            </div>
        )
    }

    return (
        <NavBarProvider>
            <AdminProvider>
                {isPageInAdminFolder ?
                        <MyComp/>
                    : (
                        <Component {...pageProps} />
                    )}
            </AdminProvider>
        </NavBarProvider>

    )
}

export default store.withRedux(App);

