import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const RequestedProperties = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: offerRequest = [], refetch } = useQuery({
        queryKey: ['offerRequest', user?.email],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/offerRequest?email=${user?.email}`)
            const res = await axiosSecure.get(`/offerRequest?email=${user?.email}}`)
            return res.data
        }
    })
    console.log(offerRequest);


    const handleStatus = async (id, prevStatus, status) => {
        if (prevStatus === status) {
            return console.log('go back');
        }

        try {
            const { data } = await axiosSecure.patch(`/offerRequest/${id}`, { status })
            refetch()
            toast.success(`Offer price accepted`)
            console.log(data)

        } catch (err) {
            toast.error(err.message)
        }

    }




    return (
        <section className='container px-4 mx-auto pt-12'>
            <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium text-gray-800 '>Offer Requests</h2>

                <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                    {offerRequest.length} Offers
                </span>
            </div>

            <div className='flex flex-col mt-6'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                        <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Property Title</span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span> Property location</span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Buyer Email</span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Buyer Name</span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <button className='flex items-center gap-x-2'>
                                                <span>Offered Price</span>
                                            </button>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Status
                                        </th>

                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 '>
                                    {offerRequest.map(offerRequest => (
                                        <tr key={offerRequest._id}>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {offerRequest.title}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {offerRequest.location}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {offerRequest.buyerEmail}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {offerRequest.buyerName}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                ${offerRequest.offerAmount}
                                            </td>

                                            <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                                                <div
                                                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${offerRequest.status === 'pending' &&
                                                        'bg-yellow-100/60 text-yellow-500'
                                                        }  ${offerRequest.status === 'accepted' &&
                                                        'bg-emerald-100/60 text-emerald-500'
                                                        } ${offerRequest.status === 'rejected' &&
                                                        'bg-red-100/60 text-red-500'
                                                        } `}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${offerRequest.status === 'pending' && 'bg-yellow-500'
                                                            } 
                              } ${offerRequest.status === 'accepted' && 'bg-green-500'} ${offerRequest.status === 'rejected' && 'bg-red-500'
                                                            }  `}
                                                    ></span>
                                                    <h2 className='text-sm font-normal '>{offerRequest?.status}</h2>
                                                </div>
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-6'>
                                                    {/* Accept Button: In Progress */}
                                                    <button
                                                        onClick={() =>
                                                            handleStatus(offerRequest._id, offerRequest.status, 'accepted')
                                                        }
                                                        disabled={offerRequest.status === 'accepted'}
                                                        className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            strokeWidth='1.5'
                                                            stroke='currentColor'
                                                            className='w-5 h-5'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                d='m4.5 12.75 6 6 9-13.5'
                                                            />
                                                        </svg>
                                                    </button>


                                                    {/* Reject Button */}
                                                    <button
                                                        onClick={() =>
                                                            handleStatus(offerRequest._id, offerRequest.status, 'rejected')
                                                        }
                                                        disabled={offerRequest.status === 'accepted'}
                                                        className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            strokeWidth='1.5'
                                                            stroke='currentColor'
                                                            className='w-5 h-5'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RequestedProperties;