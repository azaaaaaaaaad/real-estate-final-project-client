import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";

const AdvertisementDetails = () => {
    const { id } = useParams()
    const [advertisement, setAdvertisement] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/advertisement/${id}`)
            .then(res => res.json())
            .then(data => {
                // const verifiedItems = data.filter(item => item.verification_status === 'verified')
                setAdvertisement(data)
            })
    }, [])

    return (
        <div className="card card-side bg-base-100 shadow-xl ">
            <figure><img src={advertisement?.image} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{advertisement?.title}</h2>
                <p>{advertisement?.description}</p>
                <p>Price Range: ${advertisement?.price_range?.min_price}-${advertisement?.price_range?.max_price}</p>
                <p className='flex items-center gap-2'><FaRegUser />Agent: {advertisement?.agent?.name}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary btn-wide">Add to wishlist</button>
                </div>
            </div>
        </div>
    );
};

export default AdvertisementDetails;