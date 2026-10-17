import { useRouter } from "next/navigation"
import { useState, use } from "react"
const UrlData = process.env.NEXT_PUBLIC_API_URL;

const UserLogin = (props) => {
    const router = useRouter()
    const value = props.redirect;
    console.log(value)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        console.log(email, password)
        let response = await fetch(UrlData +"/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        })
        response = await response.json();
        console.log(response)
        if (response.success) {
            alert("user login successfully")

            const { result } = response;
            delete result.password;
            localStorage.setItem("user", JSON.stringify(result));
            if (value?.order) {
                router.push("/order")
            }
            else {
                router.push("/")
            }

        }
        else {
            alert("failed to login, please try again with valid email and password")
        }
    }
    return (
        <div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default UserLogin