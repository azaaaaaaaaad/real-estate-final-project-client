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
    const [reviews, setReviews] = useState([])


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/reviews`)
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
                                <figure><img className='rounded-xl w-20 h-20' src={review.image} alt="Movie" /></figure>
                                <div className="card-body items-center">
                                    <h2 className="card-title">''{review.name}''</h2>
                                    <p>{review.review}</p>
                                    <p className="flex items-center gap-4"><FaMapLocation /> {review?.propertyTitle}</p>

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