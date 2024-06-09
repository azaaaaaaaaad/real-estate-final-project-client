import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllPropertiesDetails = () => {
    const { id } = useParams()
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [properties, setProperties] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/allProperties/${id}`)
            .then(res => res.json())
            .then(data => {
                // const verified = data.filter(item => item.verification_status === 'Verified')
                setProperties(data)
            })
    }, [])

    const handleAddToWishlist = property => {
        if (user && user?.email) {
            const wishlistItem = {
                propertyId: properties._id,
                email: user.email,
                image: properties.image,
                title: properties.title,
                location: properties.location,
                agent: {
                    name: properties.agent.name,
                    image: properties.agent.image,
                },
                verification_status: properties.verification_status,
                price: properties.price_range

            }

            axiosSecure.post(`/wishlist`, wishlistItem)
            .then(res=> {
                console.log(res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${properties.title} added to your wishlist`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
        }else{

        }
    }
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl ">
                <figure><img src={properties?.image} alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{properties?.title}</h2>
                    <p>{properties?.description}</p>
                    <p>Price Range: {properties?.price_range}</p>
                    <p className='flex items-center gap-2'><FaRegUser />Agent: {properties?.agent?.name}</p>
                    <div className="card-actions justify-center">
                        <button
                            onClick={() => handleAddToWishlist(properties)}
                            className="btn btn-primary btn-wide">Add to wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPropertiesDetails;