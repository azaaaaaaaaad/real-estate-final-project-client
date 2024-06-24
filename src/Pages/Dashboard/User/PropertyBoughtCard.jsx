import { FaMapLocation, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";


const PropertyBoughtCard = ({ property }) => {
    return (
        <div>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={property.image} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{property?.title}</h2>
                    <p className='flex items-center gap-4'><FaMapLocation /> {property?.location}</p>
                    <div className='flex items-center justify-between'>
                        <div><p className='flex items-center gap-4'><FaUser></FaUser> Agent: {property?.agent}</p></div>
                        {/* <div><figure><img className='w-40 rounded-lg' src={property?.agent?.image} alt="Album" /></figure></div> */}
                    </div>
                    <p>Status:  {property?.status}</p>
                    <p>Offered Amount: ${property?.offerAmount}</p>
                    {property.status === 'accepted' ?
                        <Link to={`/payment/${property._id}`}>
                            <button
                                className="btn btn-primary w-full">
                                Pay
                            </button>
                        </Link> :
                        <button
                            disabled
                            className="btn btn-primary w-full">
                            Pay
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default PropertyBoughtCard;