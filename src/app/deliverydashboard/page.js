"use client"
import { useState, useEffect } from 'react'
import DeliveryHeader from '../_components/DeliveryHeader'
import { useRouter } from 'next/navigation'
const UrlData = "/api";

const page = () => {
    const router = useRouter();

    const [myOrders, setMyOrders] = useState([])

    useEffect(() => {
        getMyOrders()
    }, [])


    const getMyOrders = async () => {
        const deliveryStorage = JSON.parse(localStorage.getItem('delivery'))
        let response = await fetch(`${UrlData}/deliverypartners/orders/${deliveryStorage._id}`)
        response = await response.json();
        console.log(response)

        if (response.success) {
            setMyOrders(response.result)
        }
    }

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'))
        if (!delivery) {
            router.push("/deliverypartner")
        }
    }, [])

    return (
        <>
            <div>
                <DeliveryHeader />
                <h1>My Order List</h1>
                {
                    myOrders.map((item, index) => {
                        return (
                            <div className="restaurant-wrapper"
                                style={{ marginLeft: 'auto', marginRight: 'auto' }} key={index}>
                                <h4>Name: {item.data[0].rName}</h4>
                                <div>Amount: {item.amount}</div>
                                <div>Address: {item.data[0].address}</div>
                                <div>Status: {item.status}</div>
                                <div>Update Status: <select>
                                    <option>Confirm</option>
                                    <option>On the way</option>
                                    <option>Delivered</option>
                                    <option>Failed to delivery</option>
                                </select></div>
                            </div>

                        )
                    })
                }

            </div>
        </>
    )
}

export default page