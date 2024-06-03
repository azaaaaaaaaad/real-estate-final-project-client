import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const AllPropertiesDetails = () => {
    const { id } = useParams()
    const [properties, setProperties] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/allProperties/${id}`)
            .then(res => res.json())
            .then(data => {
                // const verified = data.filter(item => item.verification_status === 'Verified')
                setProperties(data)
            })
    }, [])
    return (
        <div className="card card-side bg-base-100 shadow-xl ">
            <figure><img src={properties?.image} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{properties?.title}</h2>
                <p>{properties?.description}</p>
                <p>Price Range: {properties?.price_range}</p>
                <p className='flex items-center gap-2'><FaRegUser />Agent: {properties?.agent?.name}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary btn-wide">Add to wishlist</button>
                </div>
            </div>
        </div>
    );
};

export default AllPropertiesDetails;