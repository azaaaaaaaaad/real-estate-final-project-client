// import { useContext, useState } from "react";
// import { AuthContext } from "../../../Providers/AuthProvider";
// import { imageUpload } from "../../../api/utils";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import UpdatePropertyForm from "../../../components/Form/UpdatePropertyForm";


// const UpdateProperties = () => {
//     const axiosSecure = useAxiosSecure()
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()
//     const { user } = useContext(AuthContext)
//     const [imagePreview, setImagePreview] = useState()
//     const [imageText, setImageText] = useState('Upload Image')
//     const {id} = useParams()


//     const { data: allProperties = [], refetch } = useQuery({
//         queryKey: ['allProperties'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/allProperties/${id}`)
//             return res.data
//         }
//     })

//     console.log(allProperties);


//     const handleSubmit = async e => {
//         e.preventDefault()
//         setLoading(true)
//         const form = e.target
//         const location = form.location.value
//         const title = form.title.value
//         const priceMin = form.priceMin.value
//         const priceMax = form.priceMax.value

//         const description = form.description.value
//         const image = form.image.files[0]
    

//         try {
//             const image_url = await imageUpload(image)
//             const propertyData = { location, title, priceMin, priceMax, description, image: image_url }
//             console.table(propertyData);

//             // const { data } = await axiosSecure.put(`/allProperties/${id}`)
//             const { data } = await axiosSecure.put(`/allProperties/${_id}`)
//             refetch()
//             toast.success(`Property accepted`)
//             console.log(data)
//             //post req to server
//             // await mutateAsync(propertyData)
//         } catch (err) {
//             console.log(err);
//             toast.error(err)
//             setLoading(false)
//         }
//     }

//     //handle image change

//     const handleImage = image => {
//         setImagePreview(URL.createObjectURL(image))
//         setImageText(image.name)
//     }




//     return (
//         <div>
//             {
//                 <UpdatePropertyForm
//                     allProperties={allProperties}
//                     handleSubmit={handleSubmit}
//                     setImagePreview={setImagePreview}
//                     imagePreview={imagePreview}
//                     handleImage={handleImage}
//                     imageText={imageText}
//                     loading={loading}
//                 ></UpdatePropertyForm>
//             }
//         </div>
//     );
// };

// export default UpdateProperties;



import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { imageUpload } from "../../../api/utils";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import UpdatePropertyForm from "../../../components/Form/UpdatePropertyForm";

const UpdateProperties = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setImageText] = useState('Upload Image');
    const { id } = useParams();

    const { data: allProperties = [], refetch } = useQuery({
        queryKey: ['allProperties', id],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/allProperties/${id}`);
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || error.message || 'Failed to fetch properties');
            }
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const location = form.location.value;
        const title = form.title.value;
        const priceMin = form.priceMin.value;
        const priceMax = form.priceMax.value;
        const description = form.description.value;
        const image = form.image.files[0];

        try {
            const image_url = await imageUpload(image);
            const propertyData = { location, title, priceMin, priceMax, description, image: image_url };

            const { data } = await axiosSecure.put(`/allProperties/${id}`, propertyData);
            refetch();
            navigate('/dashboard/my-added-properties')
            toast.success(`Property updated`);
            console.log(data);
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Failed to update property');
        } finally {
            setLoading(false);
        }
    };

    const handleImage = (image) => {
        setImagePreview(URL.createObjectURL(image));
        setImageText(image.name);
    };

    return (
        <div>
            <UpdatePropertyForm
                allProperties={allProperties}
                handleSubmit={handleSubmit}
                setImagePreview={setImagePreview}
                imagePreview={imagePreview}
                handleImage={handleImage}
                imageText={imageText}
                loading={loading}
            />
        </div>
    );
};

export default UpdateProperties;
