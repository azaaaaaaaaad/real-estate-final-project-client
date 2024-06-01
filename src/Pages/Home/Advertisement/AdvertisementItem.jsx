import { FaMapLocation } from "react-icons/fa6";
import { GoVerified } from "react-icons/go";
import { Link } from "react-router-dom";

const AdvertisementItem = ({ item }) => {
    const { image, title, location, price_range, verification_status } = item;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={image} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{title}</h2>
                    <p className="flex items-center gap-4"><FaMapLocation /> {location.city}, {location.state}</p>
                    <p className="flex items-center gap-2"><GoVerified /> {verification_status}</p>
                    <div className="card-actions">
                        <Link ><button className="btn btn-outline btn-black">Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertisementItem;