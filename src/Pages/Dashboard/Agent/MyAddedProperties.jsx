import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import MyAddedPropertiesCard from "./MyAddedPropertiesCard";
import toast from "react-hot-toast";


const MyAddedProperties = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: allProperties = [], isLoading, refetch } = useQuery({
        queryKey: ['my-added-properties', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-added-properties/${user?.email}`)

            return data
        },
    })

    console.log(allProperties);

    //delete
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/my-added-properties/${id}`)
            return data
        },
        onSuccess: (data) => {
            console.log(data);
            refetch()
            toast.success(`successfully deleted`)
        }
    })

    const handleDelete = async (id) => {
        console.log(id);
        try{
            await mutateAsync(id)
        }catch (err){
            console.log(err);
        }
    }

    return (
        <div>
            {
                allProperties.map(property => <MyAddedPropertiesCard
                    key={property._id}
                    property={property}
                    handleDelete={handleDelete}
                >
                </MyAddedPropertiesCard>)
            }
        </div>
    );
};

export default MyAddedProperties;