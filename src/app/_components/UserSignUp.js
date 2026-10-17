import { useRouter } from "next/navigation"
import { useState, use } from "react"
const UrlData = "/api";

const UserSignUp = (props) => {
     const value = props.redirect;
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")

    const handleSignUp = async () => {
        console.log(name, email, password, cPassword, city, address, mobile)
        let response = await fetch(UrlData +"/user", {
            method: "POST",
            body: JSON.stringify({ name, email, password, city, address, mobile })
        })
        response = await response.json();
        console.log(response)
        if (response.success) {
            alert("user registered successfully")

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
    }
    return (
        <div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                <input type="text" placeholder="Enter Mobile" className="input-field" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleSignUp}>Sign UP</button>
            </div>
        </div>
    )
}

export default UserSignUp