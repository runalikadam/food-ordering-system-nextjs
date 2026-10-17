"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const DeliveryHeader = (props) => {
    const router = useRouter()
  
    return (
        <>
            <div className='header-wrapper'>
                <div className='logo'>
                    <img style={{ width: 100 }} src="https://png.pngtree.com/template/20200610/ourmid/pngtree-food-delivery-logo-design-image_381319.jpg" />

                </div>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                   
                </ul>
            </div>
        </>
    )
}

export default DeliveryHeader