
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../Payment/CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const MakeAnOffer = ({ property }) => {
    const [startDate, setStartDate] = useState(new Date());
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: wishlist = [], refetch } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist/${id}`)
            console.log(res.data);
            return res.data
        }
    })

    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <Elements stripe={stripePromise}>
                <form>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                        <div className='space-y-6'>

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='location' className='block text-gray-600'>
                                    Location
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                    name='location'
                                    id='location'
                                    type='text'
                                    placeholder={wishlist?.location}
                                />
                            </div>
                        </div>

                        <div className='space-y-6'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='title' className='block text-gray-600'>
                                    Title
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                    name='title'
                                    id='title'
                                    type='text'
                                    placeholder={wishlist?.title}
                                    readOnly
                                />
                            </div>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='agent' className='block text-gray-600'>
                                    Agent
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                    name='agent'
                                    id='agent'
                                    type='text'
                                    placeholder={wishlist?.agent?.name}
                                    readOnly
                                />
                            </div>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='Offer Amount' className='block text-gray-600'>
                                    Offer Amount (${wishlist?.priceMin} - ${wishlist?.priceMax})
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                    name='OfferAmount'
                                    id='OfferAmount'
                                    type='text'
                                    placeholder='insert amount'
                                    required
                                />
                            </div>



                            <div className='flex justify-between gap-2'>
                                <div className='space-y-1 text-sm'>
                                    <label htmlFor='Buyer name' className='block text-gray-600'>
                                        Buyer name
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                        name='buyerName'
                                        id='buyerName'
                                        type='text'
                                        placeholder={user?.displayName}
                                        readOnly
                                    />
                                </div>

                                <div className='space-y-1 text-sm'>
                                    <label htmlFor='Buyer email' className='block text-gray-600'>
                                        Buyer email
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                        name='buyerEmail'
                                        id='buyerEmail'
                                        type='email'
                                        placeholder={user?.email}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='Buying date' className='block text-gray-600'>
                                    Buying date
                                </label>
                                <DatePicker
                                    name='buyingDate'
                                    id='buyingDate'
                                    type='date'
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                />
                            </div>

                        </div>
                    </div>

                    {/* <button
                        // disabled
                        type='submit'
                        className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500'
                    >
                        Offer Now
                    </button> */}
                <CheckoutForm></CheckoutForm>
                </form>
            </Elements>
        </div>
    );
};

export default MakeAnOffer;