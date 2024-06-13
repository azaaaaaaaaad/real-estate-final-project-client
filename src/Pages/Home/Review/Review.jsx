import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { FaMapLocation } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { data } from 'autoprefixer';



const Review = () => {
    // const axiosSecure = useAxiosSecure()
    const [reviews, setReviews] = useState([])
    // const [loading, setLoading] = useState(false)
    
    // const {data, isLoading} = useQuery({
    //     queryKey: ['reviews'],
    //     queryFn: async() => {
    //         const {data} = await axiosSecure.get('/reviews')
    //         return data
    //     },
    // })

    // console.log(data);

    // if (isLoading) return <span className="loading loading-bars loading-lg"></span>


    useEffect(() => {
        fetch(`https://real-state-server-nine.vercel.app/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])


    return (
        <div className='my-20'>
            <h2 className='text-2xl text-center font-semibold mb-6'>Reviews</h2>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className='my-2'>
                            <div className="card bg-base-100">
                                <figure><img className='rounded-xl' src={review.reviewer_image} alt="Movie" /></figure>
                                <div className="card-body items-center">
                                    <h2 className="card-title">''{review.reviewer_name}''</h2>
                                    <p>{review.review_description}</p>
                                    <p className="flex items-center gap-4"><FaMapLocation /> {review.property_title}</p>
                                    {/* <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Watch</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Review;