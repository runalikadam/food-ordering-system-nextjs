"use client"
import { useState, useEffect } from 'react'
import RestaurantFooter from '../_components/RestaurantFooter'
import CustomerHeader from '../_components/CustomerHeader'
import { DELIVERY_CHARGES, Tax } from '@/lib/constant'
import { useRouter } from 'next/navigation'
const UrlData = process.env.NEXT_PUBLIC_API_URL;

const page = () => {
    const router = useRouter();
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('user')))
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const [total] = useState(() => cartStorage?.length == 1 ? cartStorage[0].price : cartStorage?.reduce((a, b) => {
        return a.price + b.price
    }))
    console.log(total)
    const [removeCartData, setRemoveCartData] = useState(false)

    useEffect(() => {
        if (!total) {
            router.push("/")
        }
    }, [])


    const OrderNow = async () => {
        let user_Id = JSON.parse(localStorage.getItem('user'))._id;
        let city = JSON.parse(localStorage.getItem('user')).city;
        let cart = JSON.parse(localStorage.getItem('cart'));
        // let foodItemIds = cart.map((item) => item._id.toString())
        let foodItemIds = cart.map((item) => item._id.toString()).join(",");
        let resto_id = cart[0].resto_id;
        let deliveryBoyResponse = await fetch(`${UrlData}/deliverypartners/${city}`)
        deliveryBoyResponse = await deliveryBoyResponse.json();
        console.log(deliveryBoyResponse)
        const deliveryBoyIds = deliveryBoyResponse.result.map((item) => item._id)
        console.log(deliveryBoyIds);
        const deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)]
        console.log(deliveryBoy_id)
        if (!deliveryBoy_id) {
            alert("delivery partner not available")
            return false;
        }

        // let deliveryBoy_id = "6acc7154477bdfa015b7ce2a";


        let collection = {
            user_Id, resto_id, foodItemIds, deliveryBoy_id, status: "confirm", amount: total + DELIVERY_CHARGES + (total * Tax / 100)
        }
        console.log(collection)
        let response = await fetch(UrlData+"/order", {
            method: "POST",
            body: JSON.stringify(collection),
            headers: {
                "Content-Type": "application/json"
            },
        })
        response = await response.json();
        console.log(response)
        if (response.success) {
            alert("placed order successfully")
            setRemoveCartData(true)
            router.push('/myprofile')

        }
        else {
            alert("failed to ordered")
        }
    }

    return (
        <>
            <div>
                <CustomerHeader removeCartData={removeCartData} />

                <div className="total-wrapper">
                    <div className="block-1">
                        <h2>User Details</h2>
                        <div className='row'>
                            <span>Name:</span>
                            <span>{userStorage.name}</span>
                        </div>
                        <div className='row'>
                            <span>Address</span>
                            <span>{userStorage.address}</span>
                        </div>
                        <div className='row'>
                            <span>Mobile No</span>
                            <span>{userStorage.mobile}</span>
                        </div>
                        <h2>Amount Details</h2>
                        <div className='row'>
                            <span>Food Charges :</span>
                            <span>{total}</span>
                        </div>
                        <div className='row'>
                            <span>Tax :</span>
                            <span>{total * Tax / 100}</span>
                        </div>
                        <div className='row'>
                            <span>Delivery Charges :</span>
                            <span>{DELIVERY_CHARGES}</span>
                        </div>
                        <div className='row'>
                            <span>Total Amount :</span>
                            <span>{total + DELIVERY_CHARGES + (total * Tax / 100)}</span>
                        </div>
                        <h2>Payment Methods</h2>
                        <div className='row'>
                            <span>Cash on Delivery :</span>
                            <span>{total + DELIVERY_CHARGES + (total * Tax / 100)}</span>
                        </div>
                    </div>
                    <div className="block-2">
                        <button onClick={OrderNow}>Place your Order Now</button>
                    </div>
                </div>
                <RestaurantFooter />

            </div>
        </>
    )
}

export default page