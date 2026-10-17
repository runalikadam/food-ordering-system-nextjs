"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
const UrlData = process.env.NEXT_PUBLIC_API_URL;

const RestaurantSignUp = () => {
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [rName, setRName] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [error, setError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const router = useRouter();


    const signUp = async () => {
        if (password != cPassword) {
            setPasswordError(true)
        }
        else {
            setPasswordError(false)
        }
        if (!emailId || !password || !cPassword || !rName || !city || !address || !contact) {
            setError(true)
        }
        else {
            setError(false)
        }
        let response = await fetch(UrlData + "/restaurant", {
            method: "POST",
            body: JSON.stringify({ emailId, password, cPassword, rName, city, address, contact })
        })
        response = await response.json();
        console.log(response)
        if (response.success) {
            alert("Restaurant registered successfully")

            const { result } = response;
            delete result.password;
            localStorage.setItem("restaurantUser", JSON.stringify(result));
            // router.push("/restaurant/dashboard")
        }
    }
    return (
        <>
            <h3>Signup </h3>
            <div className="text-center">
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter email id" className="input-field" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                    {
                        error && !emailId && <span className="input-error">Please enter valid email</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {
                        passwordError && <span className="input-error">Password and Confirm password not match</span>
                    }
                    {
                        error && !password && <span className="input-error">Please enter password</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter confirm password" className="input-field" value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
                    {
                        passwordError && <span className="input-error">Password and Confirm password not match</span>
                    }
                    {
                        error && !cPassword && <span className="input-error">Please enter confirm password</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter restaurant name" className="input-field" value={rName} onChange={(e) => setRName(e.target.value)} />
                    {
                        error && !rName && <span className="input-error">Please enter valid name</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter city" className="input-field" value={city} onChange={(e) => setCity(e.target.value)} />
                    {
                        error && !city && <span className="input-error">Please enter valid city</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter full address" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)} />
                    {
                        error && !address && <span className="input-error">Please enter valid address</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter contact no." className="input-field" value={contact} onChange={(e) => setContact(e.target.value)} />
                    {
                        error && !contact && <span className="input-error">Please enter valid contact</span>
                    }
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={signUp}>Signup</button>
                </div>
            </div>

        </>
    )
}

export default RestaurantSignUp


