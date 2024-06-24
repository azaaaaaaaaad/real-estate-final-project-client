import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";

const CheckoutForm = () => {
    const [transactionId, setTransactionId] = useState('')
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()
    const { user } = useAuth()

    const { data: offerRequest = [], refetch } = useQuery({
        queryKey: ['offerRequest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offerRequest/${id}`)
            return res.data
        }
    })

    console.log(offerRequest);

    const totalPrice = offerRequest.offerAmount
    console.log(totalPrice);


    // useEffect(()=>{

    //     axiosSecure.post('/create-payment-intent', { price: totalPrice })
    //     .then(res => {
    //         console.log(res.data.clientSecret);
    //         setClientSecret(res.data.clientSecret);
    //     })
    // },[axiosSecure, totalPrice])

    useEffect(() => {

        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, totalPrice])




    const handleSubmit = async (event) => {
        event.preventDefault();
        // handleOfferSubmit()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }

        })
        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                onSubmit={handleSubmit}
                className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500'
                type="submit"
                disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-500"> Your Transaction id : {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;