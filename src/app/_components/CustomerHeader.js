
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const CustomerHeader = (props) => {
    const router = useRouter();

    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const [user, setUser] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart and user data from localStorage
    useEffect(() => {
        try {
            const cartStorage = JSON.parse(
                localStorage.getItem("cart") || "[]"
            );

            const userStorage = JSON.parse(
                localStorage.getItem("user") || "null"
            );

            setCartItem(cartStorage);
            setCartNumber(cartStorage.length);
            setUser(userStorage);
        } catch (error) {
            console.error("Error loading localStorage:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Add an item to the cart
    useEffect(() => {
        if (!props.cartData || !isLoaded) return;

        setCartItem((prevCart) => {
            let updatedCart;

            if (
                prevCart.length > 0 &&
                prevCart[0].resto_id !== props.cartData.resto_id
            ) {
                // Clear the old restaurant's cart
                updatedCart = [props.cartData];
            } else {
                // Add item to existing cart
                updatedCart = [
                    ...prevCart,
                    JSON.parse(JSON.stringify(props.cartData)),
                ];
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCartNumber(updatedCart.length);

            return updatedCart;
        });
    }, [props.cartData, isLoaded]);

    // Remove a selected item from the cart
    useEffect(() => {
        if (!props.removeCartData || !isLoaded) return;

        setCartItem((prevCart) => {
            const updatedCart = prevCart.filter(
                (item) => item._id !== props.removeCartData
            );

            setCartNumber(updatedCart.length);

            if (updatedCart.length === 0) {
                localStorage.removeItem("cart");
            } else {
                localStorage.setItem(
                    "cart",
                    JSON.stringify(updatedCart)
                );
            }

            return updatedCart;
        });
    }, [props.removeCartData, isLoaded]);

    // Logout
    const logOut = () => {
        localStorage.removeItem("user");
        setUser(undefined);
        router.push("/user-auth");
    };

    return (
        <div className="header-wrapper">
            <div className="logo">
                <img
                    style={{ width: 100 }}
                    src="https://png.pngtree.com/template/20200610/ourmid/pngtree-food-delivery-logo-design-image_381319.jpg"
                    alt="Food delivery logo"
                />
            </div>

            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>

                {user ? (
                    <>
                        <li>
                            <Link href="#">{user?.name}</Link>
                        </li>
                        <li>
                            <button onClick={logOut}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/user-auth">Login</Link>
                        </li>
                        <li>
                            <Link href="/user-auth">SignUp</Link>
                        </li>
                    </>
                )}

                <li>
                    <Link href={cartNumber > 0 ? "/cart" : "#"}>
                        Cart({cartNumber})
                    </Link>
                </li>

                <li>
                    <Link href="/">Add Restaurant</Link>
                </li>

                <li>
                    <Link href="/deliverypartner">
                        Delivery Partner
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default CustomerHeader;
