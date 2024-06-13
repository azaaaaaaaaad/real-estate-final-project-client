import { FaMapLocation } from "react-icons/fa6";
import { GoVerified } from "react-icons/go";
import { Link } from "react-router-dom";


const AllPropertiesCard = ({ item }) => {
    const { _id, image, title, location, agent, verification_status, priceMin, priceMax } = item

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10 ">
                    <img src={image} className="rounded-lg" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{title}</h2>
                    <p className="flex items-center gap-4"><FaMapLocation /> {location}</p>
                    <img src={agent?.image} className="w-24 rounded-lg" />
                    <p>Agent: {agent?.name}</p>
                    <p className="flex items-center gap-2">Status:<GoVerified />{verification_status}</p>
                    <p>Price: ${priceMin} - ${priceMax}</p>
                    <div className="card-actions">
                        <Link to={`/allProperties/${_id}`}>
                            <button
                                className="btn btn-outline btn-black">Details</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AllPropertiesCard;