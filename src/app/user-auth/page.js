"use client"
import { useState, use } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import RestaurantFooter from '../_components/RestaurantFooter'
import UserSignUp from '../_components/UserSignUp'
import UserLogin from '../_components/UserLogin'

const UserAuth = (props) => {
    const [login, setLogin] = useState(true)
    const searchParams = use(props.searchParams);

    return (
        <div>
            <CustomerHeader />
            <div className="container">
                <h1>{login ? "User Login" : "User Signup"}</h1>
                {login ? <UserLogin redirect={searchParams} /> : <UserSignUp redirect={searchParams} />}

                <button className="button-link" onClick={() => setLogin(!login)}>{login ? "Do not have account? Signup" : "Already have account? login"}</button>
            </div>

            <RestaurantFooter />
        </div>
    )
}

export default UserAuth