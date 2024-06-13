import React from 'react';
import { FaMapLocation, FaUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const WishlistCard = ({ property, handleDelete }) => {
    return (
        <div>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={property.image} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{property?.title}</h2>
                    <p className='flex items-center gap-4'><FaMapLocation /> {property?.location}</p>
                    <div className='flex items-center justify-between'>
                        <div><p className='flex items-center gap-4'><FaUser></FaUser> Agent: {property?.agent?.name}</p></div>
                        <div><figure><img className='w-40 rounded-lg' src={property?.agent?.image} alt="Album" /></figure></div>
                    </div>
                    <p>Status:  {property?.verification_status}</p>
                    <p>Price Range: ${property?.priceMin} - ${property?.priceMax}</p>
                    <div className="card-actions justify-end join join-vertical lg:join-horizontal">
                        <Link 
                        to={`/make-an-offer/${property._id}`}
                        property={property}>
                            <button
                                className="btn btn-primary">
                                Make an Offer
                            </button>
                        </Link>
                        <button
                            onClick={() => handleDelete(property?._id)}
                            className="btn btn-primary">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistCard;