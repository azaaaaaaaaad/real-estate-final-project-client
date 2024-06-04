import { useContext, useState } from "react";
import AddPropertyForm from "../../../components/Form/AddPropertyForm";
import { AuthContext } from "../../../Providers/AuthProvider";
import { imageUpload } from "../../../api/utils";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddProperty = () => {

    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')


    const {mutateAsync} = useMutation({
        mutationFn: async (propertyData)=> {
            const  {data} = await axiosSecure.post(`/property`, propertyData)
            return data
        },
        onSuccess: ()=> {
            console.log('data saved successfully')
            toast.success('property added successfully')
            navigate('/dashboard/my-added-properties')
            setLoading(false)
        }
    })

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target
        const location = form.location.value
        const title = form.title.value
        const priceMin = form.priceMin.value
        const priceMax = form.priceMax.value
        const description = form.description.value
        const image = form.image.files[0]
        const verification_status = 'Pending'

        const agent = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL
        }

        try {
            const image_url = await imageUpload(image)
            const propertyData = { location, title, priceMin, priceMax, description, verification_status, image: image_url, agent }
            console.table(propertyData);

            //post req to server

            await mutateAsync(propertyData)
        } catch (err) {
            console.log(err);
            toast.error(err)
            setLoading(false)
        }
    }

    //handle image change

    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }

    return (
        <div>
            {/* form */}
            <AddPropertyForm
                handleSubmit={handleSubmit}
                setImagePreview={setImagePreview}
                imagePreview={imagePreview}
                handleImage={handleImage}
                imageText={imageText}
                loading={loading}
            ></AddPropertyForm>
        </div>
    );
};

export default AddProperty;