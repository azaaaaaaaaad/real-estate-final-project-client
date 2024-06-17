import { useState } from "react";
import { FaMapLocationDot, FaUser } from "react-icons/fa6";
import DeleteModal from "../../../components/Modal/DeleteModal";


const MyAddedPropertiesCard = ({ property, handleDelete }) => {
    let [isOpen, setIsOpen] = useState(false)
    const  closeModal = () => {
        setIsOpen(false)
    }
    return (
        <div className="card card-side bg-base-100 shadow-xl ">
            <figure><img src={property.image} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{property.title}</h2>
                <p className="flex items-center gap-4"><FaMapLocationDot />{property.location}</p>
                <div className="flex">
                    <p className="flex items-center gap-4"><FaUser />Agent: {property.agent.name}</p>
                    <img className="w-20 h-20 rounded-lg" src={property.agent.image} alt="" />
                </div>
                <p>Price Range: ${property?.priceMin}-${property?.priceMax}</p>
                <p>Status: {property.verification_status}</p>
                {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
                </div> */}
                <div className="join join-vertical lg:join-horizontal">
                    <button className="btn join-item bg-green-500">Update</button>
                    <button onClick={()=> setIsOpen(true)} className="btn join-item bg-red-500">Delete</button>
                    <DeleteModal isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete} id={property._id}></DeleteModal>
                </div>
            </div>
        </div>
    );
};

export default MyAddedPropertiesCard;