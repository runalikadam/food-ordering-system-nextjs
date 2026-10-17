"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const RestaurantHeader = () => {
    const router = useRouter();
    const pathName = usePathname();
    const [details, setDetails] = useState()

    useEffect(() => {
        let data = localStorage.getItem("restaurantUser")
        if (!data) {
            router.push("/restaurant")
        }
        else if (data && pathName === "/restaurant") {
            router.push("/restaurant/dashboard")
        }
        else {
            setDetails(JSON.parse(data))
        }
    }, [])

    const logOut = () => {
        localStorage.removeItem("restaurantUser")
        router.push("/restaurant")
    }

    return (
        <>
            <div className="header-wrapper">
                <div className="logo">
                    <img style={{ width: 100 }} src="https://png.pngtree.com/template/20200610/ourmid/pngtree-food-delivery-logo-design-image_381319.jpg" />
                </div>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    {
                        details && details.rName ?
                            <>
                                <li>
                                    <Link href="/">Profile</Link>
                                </li>
                                <li>
                                    <button onClick={logOut}>Logout</button>
                                </li>
                            </>

                            :
                            <li>
                                <Link href="/">Login/Signup</Link>
                            </li>
                    }


                </ul>
            </div>
        </>
    )
}

export default RestaurantHeader