import { useRouter } from 'next/navigation'
import { useState } from 'react'

const AddFoodItem = (props) => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(false)

    const handleAddFoodItem = async () => {
        if (!name || !path || !description || !price) {
            setError(true)
            return false;
        }
        else {
            setError(false)
        }
        let resto_id;
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        if (restaurantData) {
            resto_id = restaurantData._id
        }
        let res = await fetch(UrlData + "/restaurant/foods", {
            method: "POST",
            body: JSON.stringify({ name, price, img_path: path, description, resto_id })
        })
        res = await res.json();
        if (res.success) {
            alert("food item added successfully")
            props.setAddItem(false)
        }
        else{
            alert("Food item not added")
        }
    }

    return (
        <>
            <div className="container">
                <h1>Add New Food Item</h1>
                <div className='input-wrapper'>
                    <input type="text" className="input-field" placeholder="enter food name" value={name} onChange={(e) => setName(e.target.value)} />
                    {
                        error && !name && <span className="input-error">Please enter valid name</span>
                    }
                </div>
                <div className='input-wrapper'>
                    <input type="text" className="input-field" placeholder="enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    {
                        error && !price && <span className="input-error">Please enter valid price</span>
                    }
                </div>
                <div className='input-wrapper'>
                    <input type="text" className="input-field" placeholder="enter path" value={path} onChange={(e) => setPath(e.target.value)} />
                    {
                        error && !path && <span className="input-error">Please enter valid path</span>
                    }
                </div>
                <div className='input-wrapper'>
                    <input type="text" className="input-field" placeholder="enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    {
                        error && !description && <span className="input-error">Please enter valid description</span>
                    }
                </div>
                <div className='input-wrapper'>
                    <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
                </div>
            </div>

        </>
    )
}

export default AddFoodItem