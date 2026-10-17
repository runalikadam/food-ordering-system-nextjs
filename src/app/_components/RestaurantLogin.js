import { useRouter } from "next/navigation"
import { useState } from "react"
const UrlData = "/api";

const RestaurantLogin = () => {
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const router = useRouter();


    const handleLogin = async () => {
        if (!emailId || !password) {
            setError(true);
            return false
        }
        else {
            setError(false)
        }
        let response = await fetch(UrlData + "/restaurant", {
            method: "POST",
            body: JSON.stringify({ emailId, password, login: true })
        })
        console.log(response)
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("restaurantUser", JSON.stringify(result))
            router.push("/restaurant/dashboard")
        }
        else {
            alert("Login failed")
        }
    }

    return (
        <>
            <h3> Login Component</h3>
            <div className="container">
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter email id" className="input-field" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                    {error && !emailId && <span className="input-error">please enter valid email</span>}
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && !password && <span className="input-error">please enter valid password</span>}
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleLogin}>Login</button>
                </div>
            </div>

        </>
    )
}

export default RestaurantLogin


