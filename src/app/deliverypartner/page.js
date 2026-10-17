"use client"
import { useState, useEffect } from 'react'
import DeliveryHeader from '../_components/DeliveryHeader'
import { useRouter } from 'next/navigation'
const UrlData = "/api";

const page = () => {
    const router = useRouter();
    const [loginMobile, setLoginMobile] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'))
        if (delivery) {
            router.push("/deliverydashboard")
        }
        else {
            router.push("/deliverypartner")
        }
    }, [])


    const handleLogin = async () => {
        console.log(loginMobile, loginPassword)
        let response = await fetch(UrlData+"/deliverypartners/login", {
            method: "POST",
            body: JSON.stringify({ loginMobile, loginPassword })
        })
        response = await response.json();
        console.log(response)
        if (response.success) {
            // alert("delivery login successfully")
            router.push("/deliverydashboard")

            const { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result));

        }
        else {
            alert("failed to login, please try again with valid email and password")
        }
    }

    const handleSignUp = async () => {
        let response = await fetch(UrlData +"/deliverypartners/signup", {
            method: "POST",
            body: JSON.stringify({ name, mobile, password, city, address })
        })
        response = await response.json();
        console.log(response)
        if (response.success) {
            // alert("delivery partners registered successfully")
            router.push("/deliverydashboard")

            const { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result));
            //      if (value?.order) {
            //     router.push("/order")
            // }
            // else {
            //     router.push("/")
            // }
        }
    }

    return (
        <>
            <div>
                <DeliveryHeader />
                <h1>Delivery Partner</h1>
                <div className="auth-container">

                    <div className="login-wrapper">
                        <h3>Login</h3>
                        <div className="input-wrapper">
                            <input type="text" placeholder="Enter mobile" className="input-field" value={loginMobile} onChange={(e) => setLoginMobile(e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" placeholder="Enter Password" className="input-field" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <button className="button" onClick={handleLogin}>Login</button>
                        </div>
                    </div>



                    <div className="signup-wrapper">
                        <div className="input-wrapper">
                            <h3>Sign Up</h3>
                            <input type="text" placeholder="Enter name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" placeholder="Enter Mobile" className="input-field" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" placeholder="Enter Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" placeholder="Enter Confirm Password" className="input-field" value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" placeholder="Enter City" className="input-field" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" placeholder="Enter Address" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="input-wrapper">
                            <button className="button" onClick={handleSignUp}>Sign UP</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page