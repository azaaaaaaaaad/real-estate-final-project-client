import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";


const ManageProperties = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: allProperties = [], refetch } = useQuery({
        queryKey: ['allProperties'],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/allProperties?email=${user?.email}`)
            const res = await axiosSecure.get(`/allProperties`)
            return res.data
        }
    })
    console.log(allProperties);


    const handleStatus = async (id, prevStatus, verification_status) => {
        if (prevStatus === verification_status) {
            return console.log('go back');
        }

        try {
            const { data } = await axiosSecure.patch(`/property/${id}`, { verification_status })
            refetch()
            toast.success(`Property accepted`)
            console.log(data)

        } catch (err) {
            toast.error(err.message)
        }

    }




    return (
        <section className='container px-4 mx-auto pt-12'>
            <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium text-gray-800 '>Manage Properties</h2>

                <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                    {allProperties.length} Property
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
                                                <span>Agent Name</span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Agent Email</span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Price Range</span>
                                            </div>
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
                                    {allProperties.map(allProperties => (
                                        <tr key={allProperties._id}>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {allProperties.title}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {allProperties.location}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {allProperties.agent.name}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {allProperties.agent.email}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                ${allProperties.priceMin} - ${allProperties.priceMax}
                                            </td>

                                           
                                            <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                                                <div
                                                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${allProperties.verification_status === 'Pending' &&
                                                        'bg-yellow-100/60 text-yellow-500'
                                                        }  ${allProperties.verification_status === 'Verified' &&
                                                        'bg-emerald-100/60 text-emerald-500'
                                                        } ${allProperties.verification_status === 'Rejected' &&
                                                        'bg-red-100/60 text-red-500'
                                                        } `}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${allProperties.verification_status === 'Pending' && 'bg-yellow-500'
                                                            } 
                              } ${allProperties.verification_status === 'Verified' && 'bg-green-500'} ${allProperties.verification_status === 'Rejected' && 'bg-red-500'
                                                            }  `}
                                                    ></span>
                                                    <h2 className='text-sm font-normal '>{allProperties?.verification_status}</h2>
                                                </div>
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-6'>
                                                    {/* Accept Button: In Progress */}
                                                    <button
                                                        onClick={() =>
                                                            handleStatus(allProperties._id, allProperties.verification_status, 'Verified')
                                                        }
                                                        disabled={allProperties.verification_status === 'Verified'}
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
                                                            handleStatus(allProperties._id, allProperties.verification_status, 'Rejected')
                                                        }
                                                        disabled={allProperties.verification_status === 'Verified'}
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

export default ManageProperties;