
"use client";

import { useState, useEffect } from "react";
import RestaurantFooter from "../_components/RestaurantFooter";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGES, Tax } from "@/lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

    const [cartStorage, setCartStorage] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage after the component mounts
    useEffect(() => {
        try {
            const storedCart = JSON.parse(
                localStorage.getItem("cart") || "[]"
            );

            setCartStorage(
                Array.isArray(storedCart) ? storedCart : []
            );
        } catch (error) {
            console.error("Error loading cart:", error);
            setCartStorage([]);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Calculate food charges
    const total = cartStorage.reduce((sum, item) => {
        return sum + Number(item.price || 0);
    }, 0);

    const taxAmount = (total * Tax) / 100;
    const totalAmount = total + DELIVERY_CHARGES + taxAmount;

    // Remove item from cart
    const RemoveCartItem = (id) => {
        const updatedCart = cartStorage.filter(
            (item) => item._id !== id
        );

        setCartStorage(updatedCart);

        if (updatedCart.length > 0) {
            localStorage.setItem(
                "cart",
                JSON.stringify(updatedCart)
            );
        } else {
            localStorage.removeItem("cart");
        }
    };

    // Place order
    const OrderNow = () => {
        const user = JSON.parse(
            localStorage.getItem("user") || "null"
        );

        if (cartStorage.length === 0) {
            alert("Please add food items to your cart first.");
            return;
        }

        if (user) {
            router.push("/order");
        } else {
            router.push("/user-auth?order=true");
        }
    };

    // Avoid showing incorrect cart information before loading
    if (!isLoaded) {
        return <div>Loading cart...</div>;
    }

    return (
        <>
            <CustomerHeader />

            <div className="food-item-wrapper">
                {cartStorage.length > 0 ? (
                    cartStorage.map((data) => (
                        <div
                            key={data._id}
                            className="list-item"
                        >
                            <div className="list-item-block-1">
                                <img
                                    src={data.img_path}
                                    alt={data.name}
                                    style={{ width: 100 }}
                                />
                            </div>

                            <div className="list-item-block-2">
                                <div>{data.name}</div>

                                <div className="description">
                                    {data.description}
                                </div>

                                <button
                                    onClick={() =>
                                        RemoveCartItem(data._id)
                                    }
                                >
                                    Remove from cart
                                </button>
                            </div>

                            <div className="list-item-block-3">
                                Price: {data.price}
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>No food items added for now</h1>
                )}
            </div>

            <div className="total-wrapper">
                <div className="block-1">
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
                        <span>{totalAmount}</span>
                    </div>
                </div>

                <div className="block-2">
                    <button
                        onClick={OrderNow}
                        disabled={cartStorage.length === 0}
                    >
                        Order Now
                    </button>
                </div>
            </div>

            <RestaurantFooter />
        </>
    );
};

export default Page;
