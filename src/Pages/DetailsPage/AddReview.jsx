// import { useState } from "react";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
// import { useNavigate, useParams } from "react-router-dom";
// import useAuth from "../Hooks/useAuth";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import AddReviewForm from "../../components/Form/AddReviewForm";
// import { imageUpload } from "../../api/utils";



// const AddReview = () => {

//     const {id} = useParams()
//     const axiosSecure = useAxiosSecure()
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()
//     const { user } = useAuth()
//     const [imagePreview, setImagePreview] = useState()
//     const [imageText, setImageText] = useState('Upload Image')


//     const { data: allProperties = [], refetch } = useQuery({
//         queryKey: ['allProperties'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/allProperties/${id}`)
//             return res.data
//         }
//     })

//     console.log(allProperties);

//     const { mutateAsync } = useMutation({
//         mutationFn: async (reviewData) => {
//             const { data } = await axiosSecure.post(`/reviews`, reviewData)
//             return data
//         },
//         onSuccess: () => {
//             console.log('data saved successfully')
//             toast.success('review added successfully')
//             navigate('/dashboard/my-reviews')
//             setLoading(false)
//         }
//     })


//     const handleSubmit = async e => {
//         e.preventDefault()
//         setLoading(true)
//         const form = e.target
//         const name = form.name.value
//         const email = form.email.value
//         const propertyTitle = allProperties.title

//         const review = form.review.value
//         const image = form.image.files[0]

//         try {
//             const image_url = await imageUpload(image)
//             const reviewData = {
//                 name,
//                 email,
//                 review,
//                 propertyTitle,
//                 image: image_url,
//             }
//             console.table(reviewData);

//             //post req to server

//             await mutateAsync(reviewData)
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
//             <AddReviewForm
//                 // properties={properties}
//                 handleSubmit={handleSubmit}
//                 setImagePreview={setImagePreview}
//                 imagePreview={imagePreview}
//                 handleImage={handleImage}
//                 imageText={imageText}
//                 loading={loading}
//             ></AddReviewForm>
//         </div>
//     );
// };

// export default AddReview;


import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AddReviewForm from "../../components/Form/AddReviewForm";
import { imageUpload } from "../../api/utils";

const AddReview = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setImageText] = useState('Upload Image');

    const { data: allProperties, isLoading, isError } = useQuery({
        queryKey: ['allProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allProperties/${id}`);
            return res.data;
        }
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (reviewData) => {
            const { data } = await axiosSecure.post(`/reviews`, reviewData);
            return data;
        },
        onSuccess: () => {
            console.log('data saved successfully');
            toast.success('Review added successfully');
            navigate('/dashboard/my-reviews');
            setLoading(false);
        }
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const propertyTitle = allProperties?.title || '';
        const agent = allProperties?.agent?.name || '';
        const reviewerImage = user.photoURL

        const review = form.review.value;
        const image = form.image.files[0];

        try {
            const image_url = await imageUpload(image);
            const reviewData = {
                name,
                email,
                reviewerImage,
                review,
                propertyTitle,
                agent,
                image: image_url,
            };

            await mutateAsync(reviewData);
            toast.success('Review added successfully');
            navigate('/dashboard/my-reviews');
        } catch (err) {
            console.error('Error adding review:', err);
            toast.error('Failed to add review');
        } finally {
            setLoading(false);
        }
    };


    const handleImage = (image) => {
        setImagePreview(URL.createObjectURL(image));
        setImageText(image.name);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading property data.</div>;

    return (
        <div>
            <AddReviewForm
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

export default AddReview;
