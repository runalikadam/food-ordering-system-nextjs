"use client";

import CustomerHeader from '@/app/_components/CustomerHeader';
import RestaurantFooter from '@/app/_components/RestaurantFooter';
import { use, useEffect, useState } from 'react';
const UrlData = "/api";

const Page = (props) => {
    const { name } = use(props.params);
    const { id } = use(props.searchParams);

    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [cartData, setCartData] = useState()
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const [cartIds, setCartIds] = useState(cartStorage ? () => cartStorage.map((data) => {
        return data._id
    }) : [])

    const [removeCartData, setRemoveCartData] = useState()

    useEffect(() => {
        if (id) {
            loadRestaurantDetails();
        }
    }, [id]);
    console.log(cartIds)

    const loadRestaurantDetails = async () => {
        try {
            const res = await fetch(
                `${UrlData}/customer/${id}`,
                { method: "GET" }
            );

            const data = await res.json();

            if (res.ok && data.success) {
                setRestaurantDetails(data.details);
                setFoodItems(data.foodItems);
            } else {
                console.log(data);
                alert("Food items not fetched");
            }
        } catch (error) {
            console.error("API error:", error);
        }
    };

    const AddToCart = async (item) => {
        setCartData(item)
        let localCardIds = cartIds;
        localCardIds.push(item._id)
        setCartIds(localCardIds)
        setRemoveCartData()
    }

    const RemoveCartItem = async (id) => {
        setRemoveCartData(id)
        var localIds=cartIds.filter((data)=>data != id)
        setCartData()
        setCartIds(localIds)
    }

    return (
        <>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />

            <div className="restaurant-page-banner">
                <h1>{decodeURIComponent(name)}</h1>
            </div>

            <div className="detail-wrapper">
                <h4>Contact: {restaurantDetails?.contact}</h4>
                <h4>City: {restaurantDetails?.city}</h4>
                <h4>Address: {restaurantDetails?.address}</h4>
                <h4>Email: {restaurantDetails?.emailId}</h4>
            </div>

            <div className="food-item-wrapper">
                {foodItems.length > 0 ? foodItems.map((data) => (
                    <div key={data._id} className="list-item">
                        <div> <img
                            src={data.img_path}
                            alt={data.name}
                            style={{ width: 100 }}
                        /></div>
                        <div>
                            <div>{data.name}</div>
                            <div>{data.price}</div>
                            <div className="description">{data.description}</div>
                            {
                                cartIds.includes(data._id) ?
                                    <button onClick={() => RemoveCartItem(data._id)}>Remove from cart</button>
                                    :
                                    <button onClick={() => AddToCart(data)}>Add to cart</button>
                            }


                        </div>

                    </div>
                )) : <h1>No Food item added for now</h1>}
            </div>
            <RestaurantFooter />
        </>
    );
};

export default Page;