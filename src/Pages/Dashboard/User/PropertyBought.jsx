import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PropertyBoughtCard from "./PropertyBoughtCard";


const PropertyBought = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: offerRequest = [], refetch } = useQuery({
        queryKey: ['offerRequest', user?.email],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/offerRequest?email=${user?.email}`)
            const res = await axiosSecure.get(`/offerRequest?email=${user?.email}}`)
            return res.data
        }
    })
    console.log(offerRequest);



    return (
        <div>
            {
                offerRequest.map(property => <PropertyBoughtCard
                    key={property._id}
                    property={property}
                ></PropertyBoughtCard>)
            }
        </div>
    );
};

export default PropertyBought;