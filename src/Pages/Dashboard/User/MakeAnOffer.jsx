
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../Payment/CheckoutForm';
import toast from 'react-hot-toast';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const MakeAnOffer = ({ property }) => {
    const [offerAmount, setOfferAmount] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const { user } = useAuth()
    const { data: wishlist = [], refetch } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist/${id}`)
            return res.data
        }
    })


    const {mutateAsync} = useMutation({
        mutationFn: async (propertyData)=> {
            const  {data} = await axiosSecure.post(`/offerRequest`, propertyData)
            return data
        },
        // onSuccess: ()=> {
        //     console.log('data saved successfully')
        //     toast.success('offer request added successfully')
        //     navigate('/dashboard/property-bought')
        //     setLoading(false)
        // }
    })

    const handleOfferSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const location = form.location.value;
        const title = form.title.value;
        const image = wishlist.image
        const agent = form.agent.value;
        const offerAmount = parseFloat(form.offerAmount.value)
        if (offerAmount < parseFloat(wishlist.priceMin)) {
            return toast.error('offer more or at least equal to minimum price')
        }
        if (offerAmount > parseFloat(wishlist.priceMax)) {
            return toast.error('offer less or equal to maximum price')
        }
        const status = 'pending';
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const buyingDate = form.buyingDate.value;
    
        const propertyData = {
            location,
            title,
            image,
            agent,
            offerAmount,
            status,
            buyerName,
            buyerEmail,
            buyingDate
        };
    
        try {
            await mutateAsync(propertyData);
            console.log('data saved successfully');
            toast.success('Offer request added successfully');
            navigate('/dashboard/property-bought');
            setLoading(false);
        } catch (err) {
            console.error('Error posting data:', err);
            toast.error(err.message); // Display only the error message
            setLoading(false);
        }
    };





    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <Elements stripe={stripePromise}>
                <form onSubmit={handleOfferSubmit}>
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
                                    readOnly
                                    defaultValue={wishlist?.location}
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
                                    readOnly
                                    defaultValue={wishlist?.title}
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
                                    defaultValue={wishlist?.agent?.name}
                                    readOnly
                                />
                            </div>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='Offer Amount' className='block text-gray-600'>
                                    Offer Amount (${wishlist?.priceMin} - ${wishlist?.priceMax})
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                                    name='offerAmount'
                                    id='offerAmount'
                                    type='number'
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
                                        defaultValue={user?.displayName}
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
                                        defaultValue={user?.email}
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
                    {/* <Link to={'/payment'} > */}
                        <button
                        // onClick={handleOfferSubmit}
                            // disabled
                            // handleOfferSubmit={handleOfferSubmit}
                            type='submit'
                            className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500'
                        >
                            Offer Now
                        </button>
                    {/* </Link> */}

                    
                    {/* <CheckoutForm
                        handleOfferSubmit={handleOfferSubmit}
                        >
                    </CheckoutForm> */}
                </form>
            </Elements>
        </div>
    );
};

export default MakeAnOffer;