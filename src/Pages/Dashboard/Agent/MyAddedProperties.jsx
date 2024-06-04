import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import MyAddedPropertiesCard from "./MyAddedPropertiesCard";


const MyAddedProperties = () => {
    const{user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: allProperties = [], isLoading, refetch } = useQuery({
        queryKey: ['my-added-properties', user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/my-added-properties/${user?.email}`)
    
          return data
        },
      })

      console.log(allProperties);

    const handleDelete =(id) => {
        console.log(id);
    }

    return (
        <div>
            {
                allProperties.map(property=> <MyAddedPropertiesCard
                key={property._id}
                property={property}
                refetch={refetch}
                handleDelete={handleDelete}
                >
                </MyAddedPropertiesCard>)
            }
        </div>
    );
};

export default MyAddedProperties;