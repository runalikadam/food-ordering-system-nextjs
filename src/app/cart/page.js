"use client"
import { useState } from 'react'
import RestaurantFooter from '../_components/RestaurantFooter'
import CustomerHeader from '../_components/CustomerHeader'
import { DELIVERY_CHARGES, Tax } from '@/lib/constant'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const [total] = useState(() => cartStorage.length == 1 ? cartStorage[0].price : cartStorage.reduce((a, b) => {
        return a.price + b.price
    }))
    console.log(total)

    const OrderNow = () => {
        if (JSON.parse(localStorage.getItem('user'))) {
            router.push("/order")
        }
        else {
            router.push("/user-auth?order=true")
        }

    }

    return (
        <>
            <div>
                <CustomerHeader />

                <div className="food-item-wrapper">
                    {cartStorage.length > 0 ? cartStorage.map((data) => (
                        <div key={data._id} className="list-item">
                            <div className="list-item-block-1"> <img
                                src={data.img_path}
                                alt={data.name}
                                style={{ width: 100 }}
                            /></div>
                            <div className="list-item-block-2">
                                <div>{data.name}</div>

                                <div className="description">{data.description}</div>
                                <button onClick={() => RemoveCartItem(data._id)}>Remove from cart</button>
                            </div>
                            <div className="list-item-block-3">Price: {data.price}</div>
                        </div>
                    )) : <h1>No Food item added for now</h1>}
                </div>

                <div className="total-wrapper">
                    <div className="block-1">
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

                    </div>
                    <div className="block-2">
                        <button onClick={OrderNow}>Order Now</button>
                    </div>
                </div>
                <RestaurantFooter />

            </div>
        </>
    )
}

export default page