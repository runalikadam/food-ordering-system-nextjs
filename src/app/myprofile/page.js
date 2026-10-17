"use client"
import { useState, useEffect } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import RestaurantFooter from '../_components/RestaurantFooter'
const UrlData = process.env.NEXT_PUBLIC_API_URL;

const page = () => {
    const [myOrders, setMyOrders] = useState([])

    useEffect(() => {
        getMyOrders()
    }, [])


    const getMyOrders = async () => {
        const userStorage = JSON.parse(localStorage.getItem('user'))
        let response = await fetch(`${UrlData}/order?id=${userStorage._id}`)
        response = await response.json();
        console.log(response)

        if (response.success) {
            setMyOrders(response.result)
        }
    }
    return (
        <>
            <div>
                <CustomerHeader />
                {
                    myOrders.map((item, index) => {
                        return (
                            <div className="restaurant-wrapper"
                            style={{marginLeft:'auto', marginRight:'auto'}} key={index}>
                                <h4>Name {item.data[0].rName}</h4>
                                <div>Amount: {item.amount}</div>
                                <div>Address: {item.data[0].address}</div>
                                <div>Status: {item.status}</div>
                            </div>

                        )
                    })
                }
                
                <RestaurantFooter />
            </div>
        </>
    )
}

export default page