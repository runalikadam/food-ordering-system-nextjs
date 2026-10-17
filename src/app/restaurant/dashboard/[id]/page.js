'use client'
import { useRouter } from 'next/navigation';
import { useState, use, useEffect } from 'react'
const UrlData = "/api";

const EditFoodItem = (props) => {
    const router = useRouter()
    const params = use(props.params);
    console.log(params.id)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        handleLoadEditItem()
    }, [])


    const handleLoadEditItem = async () => {

        let res = await fetch(`${UrlData}/restaurant/foods/edit/${params.id}`, {
            method: "GET",
           
        })
        res = await res.json();
        if (res.success) {
            setName(res.result.name)
            setPrice(res.result.price)
            setDescription(res.result.description)
            setPath(res.result.img_path)
        }
        else {
            alert("Food item not fetched")
        }
    }

    const handleEditItem = async () => {
        if (!name || !path || !description || !price) {
            setError(true)
            return false;
        }
        else {
            setError(false)
        }
        let res = await fetch(`${UrlData}/restaurant/foods/edit/${params.id}`, {
            method: "PUT",
             body: JSON.stringify({ name, price, img_path: path, description })
        })
        res = await res.json();
        if (res.success) {
            router.push("../dashboard")
        }
        else {
            alert("Food item not updated")
        }
    }

    return (
        <>
            <div className="container">
                <h1>Update Food Item</h1>
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
                    <button className="button" onClick={handleEditItem}>Update Food Item</button>
                </div>
                <br />
                <div className='input-wrapper'>
                    <button className="button" onClick={() => router.push("../dashboard")}>Back to Food Item</button>
                </div>
            </div>

        </>
    )
}

export default EditFoodItem