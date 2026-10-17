import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
const UrlData = process.env.NEXT_PUBLIC_API_URL;

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState([])
    const router = useRouter()
    useEffect(() => {
        loadFoodItems()
    }, [])


    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"))
        const resto_id = restaurantData._id
        let res = await fetch(`${UrlData}restaurant/foods/${resto_id}`, {
            method: "GET",
        })
        res = await res.json();
        console.log(res.result)
        if (res.success) {
            setFoodItems(res.result)
        }
        else {
            alert("food items not added")
        }
    }

    const DeleteFoodItems = async (id) => {

        let res = await fetch(`${UrlData}/restaurant/foods/${id}`, {
            method: "DELETE",
        })
        res = await res.json();
        console.log(res.result)
        if (res.success) {
            alert("Food Deleted Successfully")
            //   setFoodItems(res.result)
           loadFoodItems()
        }
        else {
            alert("Food not Deleted")
        }
    }

    return (
        <>
            <h1>Food Item</h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        foodItems.map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td><img src={item.img_path} /></td>
                                    <td><button onClick={() => DeleteFoodItems(item._id)}>Delete</button><button onClick={()=>router.push(`dashboard/`+item._id)}>Edit</button></td>
                                </tr>
                            )

                        })
                    }

                </tbody>
            </table>
        </>
    )
}

export default FoodItemList