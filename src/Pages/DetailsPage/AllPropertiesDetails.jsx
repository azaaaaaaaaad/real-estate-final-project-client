import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import AddPropertyForm from '../../components/Form/AddPropertyForm';

const AllPropertiesDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [properties, setProperties] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/allProperties/${id}`)
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
                priceMin: properties.priceMin,
                priceMax: properties.priceMax

            }

            axiosSecure.post(`/wishlist`, wishlistItem)
                .then(res => {
                    console.log(res.data);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${properties.title} added to your wishlist`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(`/dashboard/wishlist`)
                })
        } else {

        }
    }
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl ">
                <figure><img src={properties?.image} alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{properties?.title}</h2>
                    <p>{properties?.description}</p>
                    <p>Price Range: ${properties?.priceMin} - ${properties?.priceMax}</p>
                    <p className='flex items-center gap-2'><FaRegUser />Agent: {properties?.agent?.name}</p>
                    <div className="card-actions justify-center">

                        <button
                            onClick={() => handleAddToWishlist(properties)}
                            className="btn btn-primary btn-wide">
                            Add to wishlist
                        </button>

                        <Link to={`/add-review/${id}`}>
                            <button
                                // onClick={() => handleAddToWishlist(properties)}
                                className="btn btn-secondary btn-wide">
                                Add a Review
                            </button>
                        </Link>

                    </div>


                </div>
            </div>
        </div>
    );
};

export default AllPropertiesDetails;