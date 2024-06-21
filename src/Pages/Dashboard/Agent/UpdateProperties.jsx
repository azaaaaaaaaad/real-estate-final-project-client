import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";



const UpdateProperties = () => {
 
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const { user } = useAuth()


    const { data: allProperties = [], refetch } = useQuery({
        queryKey: ['allProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allProperties/${id}`)
            return res.data
        }
    })

    console.log(allProperties);




    return (
        <div>
            UpdateProperties
        </div>
    );
};

export default UpdateProperties;