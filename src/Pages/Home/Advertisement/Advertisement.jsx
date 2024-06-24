import { useEffect, useState } from "react";
import AdvertisementItem from "./AdvertisementItem";
import { Helmet } from "react-helmet-async";


const Advertisement = () => {

    const [advertisement, setAdvertisement] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/advertisement`)
            .then(res => res.json())
            .then(data => {
                const verifiedItems = data.filter(item => item.verification_status === 'verified')
                setAdvertisement(verifiedItems)
            })
    }, [])

    return (
        <div>
            <h2 className='text-2xl text-center font-semibold mb-6'>Advertisement</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-4">
                {
                    advertisement.map(item =>
                        <AdvertisementItem
                            key={item._id}
                            item={item}
                        ></AdvertisementItem>)
                }
            </div>
        </div>
    );
};

export default Advertisement;