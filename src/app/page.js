"use client"
import { useRouter } from 'next/navigation';
import CustomerHeader from './_components/CustomerHeader'
import RestaurantFooter from './_components/RestaurantFooter'
import styles from './page.module.css'
import { useState, useEffect } from "react";
const UrlData = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const router = useRouter()
  const [location, setLocation] = useState([])
  const [selectLocation, setSelectLocation] = useState("")
  const [showLocation, setShowLocation] = useState(false)
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    loadLocation()
    loadRestaurant()
  }, [])

  const loadLocation = async () => {
    let response = await fetch(`${UrlData}/customer/locations`, {
      method: "GET"
    })
    response = await response.json()
    console.log(response.result)
    if (response.success) {
      setLocation(response.result)
    }
  }

  const loadRestaurant = async (params) => {
    let url = UrlData + "/customer"
    if (params?.location) {
      url = url + "?location=" + params.location
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant
    }
    let response = await fetch(url, {
      method: "GET"
    })
    response = await response.json()
    console.log(response.result)
    if (response.success) {
      setRestaurants(response.result)
    }
  }

  const handleListItem = (item) => {
    setSelectLocation(item)
    setShowLocation(false)
    loadRestaurant({ location: item })
  }

  return (
    <main >
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input className="select-input" placeholder="Select place" value={selectLocation} onChange={(e) => setSelectLocation(e.target.value)} onFocus={() => { setShowLocation(true) }} />
          <ul className="location-list">
            {
              showLocation && location.map((data) => {
                return (
                  <div key={data._id}>
                    <li onClick={() => handleListItem(data)}>{data}</li>
                  </div>

                )
              })
            }
          </ul>

          <input className="search-input" type="text" placeholder="Enter food or restaurant name" onChange={(e) => loadRestaurant({ restaurant: e.target.value })} />
        </div>
      </div>
      <div className="restaurant-list-container">
        {
          restaurants.map((data) => {
            return (
              <>
                <div key={data._id} className="restaurant-wrapper" onClick={()=>router.push("explore/"+data.rName+"?id="+data._id)}>
                  <div className="heading-wrapper">
                    <h3>{data.rName}</h3>
                    <h5>Contact:{data.contact}</h5>
                  </div>

                  <div className="address-wrapper">
                    <div>{data.city} </div>
                    <div>{data.address}, Email: {data.emailId}</div>
                  </div>
                </div>
              </>

            )
          })
        }
      </div>

      <RestaurantFooter />
    </main>
  )
}
