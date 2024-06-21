import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AddReviewForm from "../../components/Form/AddReviewForm";
import { imageUpload } from "../../api/utils";



const AddReview = () => {


    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')


    // console.log(properties);

    const { mutateAsync } = useMutation({
        mutationFn: async (reviewData) => {
            const { data } = await axiosSecure.post(`/reviews`, reviewData)
            return data
        },
        onSuccess: () => {
            console.log('data saved successfully')
            toast.success('review added successfully')
            navigate('/dashboard/my-reviews')
            setLoading(false)
        }
    })


    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target
        const reviewerName = form.reviewerName.value
        const reviewerEmail = form.reviewerEmail.value
        // const propertyTitle = properties.title

        const review = form.review.value
        const image = form.image.files[0]

        try {
            const image_url = await imageUpload(image)
            const reviewData = {
                reviewerName,
                reviewerEmail,
                review,
                // propertyTitle,
                image: image_url,
            }
            console.table(reviewData);

            //post req to server

            await mutateAsync(reviewData)
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
            <AddReviewForm
                // properties={properties}
                handleSubmit={handleSubmit}
                setImagePreview={setImagePreview}
                imagePreview={imagePreview}
                handleImage={handleImage}
                imageText={imageText}
                loading={loading}
            ></AddReviewForm>
        </div>
    );
};

export default AddReview;