
"use client"

import { useState, useEffect } from 'react'
import RestaurantFooter from '../_components/RestaurantFooter'
import CustomerHeader from '../_components/CustomerHeader'
import { DELIVERY_CHARGES, Tax } from '@/lib/constant'
import { useRouter } from 'next/navigation'

const UrlData = "/api";

const Page = () => {
    const router = useRouter()

    const [userStorage, setUserStorage] = useState(null)
    const [cartStorage, setCartStorage] = useState([])
    const [total, setTotal] = useState(0)
    const [removeCartData, setRemoveCartData] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)

    // Load user and cart data only in the browser
    useEffect(() => {
        try {
            const userData = JSON.parse(
                localStorage.getItem('user') || 'null'
            )

            const cartData = JSON.parse(
                localStorage.getItem('cart') || '[]'
            )

            setUserStorage(userData)
            setCartStorage(Array.isArray(cartData) ? cartData : [])

            const foodTotal = Array.isArray(cartData)
                ? cartData.reduce(
                    (sum, item) => sum + Number(item.price || 0),
                    0
                )
                : 0

            setTotal(foodTotal)

            if (!userData || !Array.isArray(cartData) || cartData.length === 0) {
                router.replace('/')
                return
            }
        } catch (error) {
            console.error('Error loading user or cart data:', error)
            router.replace('/')
        } finally {
            setIsLoaded(true)
        }
    }, [router])

    const OrderNow = async () => {
        if (isPlacingOrder) return

        try {
            const user = JSON.parse(localStorage.getItem('user') || 'null')
            const cart = JSON.parse(localStorage.getItem('cart') || '[]')

            if (!user?._id || !user?.city || !Array.isArray(cart) || cart.length === 0) {
                alert('User details or cart data is missing. Please try again.')
                router.push('/')
                return
            }

            if (!UrlData) {
                alert('API URL is not configured.')
                return
            }

            setIsPlacingOrder(true)

            const user_Id = user._id
            const city = user.city
            const foodItemIds = cart
                .map((item) => item._id?.toString())
                .filter(Boolean)
                .join(',')

            const resto_id = cart[0]?.resto_id

            if (!foodItemIds || !resto_id) {
                alert('Invalid cart data. Please check your cart.')
                return
            }

            // Find available delivery partners
            const deliveryResponse = await fetch(
                `${UrlData}/deliverypartners/${encodeURIComponent(city)}`
            )

            if (!deliveryResponse.success) {
                throw new Error('Unable to fetch delivery partners.')
            }

            const deliveryBoyResponse = await deliveryResponse.json()
            const deliveryPartners = deliveryBoyResponse.result || []

            if (deliveryPartners.length === 0) {
                alert('Delivery partner not available')
                return
            }

            const deliveryBoy = deliveryPartners[
                Math.floor(Math.random() * deliveryPartners.length)
            ]

            const deliveryBoy_id = deliveryBoy?._id

            if (!deliveryBoy_id) {
                alert('Delivery partner not available')
                return
            }

            const finalAmount =
                total + DELIVERY_CHARGES + (total * Tax / 100)

            const collection = {
                user_Id,
                resto_id,
                foodItemIds,
                deliveryBoy_id,
                status: 'confirm',
                amount: finalAmount
            }

            const response = await fetch(`${UrlData}/order`, {
                method: 'POST',
                body: JSON.stringify(collection),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json()

            if (!response.ok || !result.success) {
                alert('Failed to place order')
                return
            }

            alert('Order placed successfully')

            // Clear the cart after successful order placement
            localStorage.setItem('cart', JSON.stringify([]))
            setCartStorage([])
            setRemoveCartData(true)

            router.push('/myprofile')
        } catch (error) {
            console.error('Error placing order:', error)
            alert('Something went wrong while placing your order. Please try again.')
        } finally {
            setIsPlacingOrder(false)
        }
    }

    // Avoid rendering user details before browser storage is loaded
    if (!isLoaded || !userStorage || cartStorage.length === 0) {
        return null
    }

    const taxAmount = total * Tax / 100
    const finalAmount = total + DELIVERY_CHARGES + taxAmount

    return (
        <>
            <div>
                <CustomerHeader removeCartData={removeCartData} />

                <div className="total-wrapper">
                    <div className="block-1">
                        <h2>User Details</h2>

                        <div className="row">
                            <span>Name:</span>
                            <span>{userStorage.name}</span>
                        </div>

                        <div className="row">
                            <span>Address:</span>
                            <span>{userStorage.address}</span>
                        </div>

                        <div className="row">
                            <span>Mobile No:</span>
                            <span>{userStorage.mobile}</span>
                        </div>

                        <h2>Amount Details</h2>

                        <div className="row">
                            <span>Food Charges:</span>
                            <span>{total}</span>
                        </div>

                        <div className="row">
                            <span>Tax:</span>
                            <span>{taxAmount}</span>
                        </div>

                        <div className="row">
                            <span>Delivery Charges:</span>
                            <span>{DELIVERY_CHARGES}</span>
                        </div>

                        <div className="row">
                            <span>Total Amount:</span>
                            <span>{finalAmount}</span>
                        </div>

                        <h2>Payment Methods</h2>

                        <div className="row">
                            <span>Cash on Delivery:</span>
                            <span>{finalAmount}</span>
                        </div>
                    </div>

                    <div className="block-2">
                        <button
                            onClick={OrderNow}
                            disabled={isPlacingOrder}
                        >
                            {isPlacingOrder
                                ? 'Placing Order...'
                                : 'Place your Order Now'}
                        </button>
                    </div>
                </div>

                <RestaurantFooter />
            </div>
        </>
    )
}

export default Page