import { useContext, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Providers/AuthProvider'
import { FaMoneyBillTransfer, FaUser } from 'react-icons/fa6'
import { MdAddHomeWork, MdOutlineBroadcastOnHome } from 'react-icons/md'
import { RiHomeGearFill } from 'react-icons/ri'
import useRole from '../../../Pages/Hooks/useRole'

const Sidebar = () => {
    const { logOut } = useContext(AuthContext)
    const [isActive, setActive] = useState(false)
    const [role] = useRole()
    console.log(role);

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                    <Link to={'/'} className="btn btn-ghost text-xl font-semibold">Real Estate</Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-blue-700 text-white mx-auto'>
                        <Link to={'/'} className="btn btn-ghost text-xl font-semibold">Real Estate</Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        {/* Conditional toggle button here.. */}

                        {/*  Menu Items */}
                        <nav>
                            {/* Statistics */}
                            <NavLink
                                to='/dashboard'
                                end
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                    }`
                                }
                            >
                                <FaUser  className='w-5 h-5' />

                                <span className='mx-4 font-medium'>Agent Profile</span>
                            </NavLink>

                            {/* Add Room */}
                            <NavLink
                                to='add-property'
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                    }`
                                }
                            >
                                <MdAddHomeWork  className='w-5 h-5' />

                                <span className='mx-4 font-medium'>Add Property</span>
                            </NavLink>
                            {/* My Listing */}
                            <NavLink
                                to='my-added-properties'
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                    }`
                                }
                            >
                                <RiHomeGearFill className='w-5 h-5' />

                                <span className='mx-4 font-medium'>My added properties</span>
                            </NavLink>

                            <NavLink
                                to='my-sold-properties'
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                    }`
                                }
                            >
                                <FaMoneyBillTransfer className='w-5 h-5' />

                                <span className='mx-4 font-medium'>My sold properties</span>
                            </NavLink>

                            <NavLink
                                to='requested-properties'
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                    }`
                                }
                            >
                                <MdOutlineBroadcastOnHome className='w-5 h-5' />

                                <span className='mx-4 font-medium'>Requested properties</span>
                            </NavLink>
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />

                    {/* Profile Menu */}
                    {/* <NavLink
                        to='/dashboard/profile'
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                            }`
                        }
                    >
                        <FaUserGraduate className='w-5 h-5' />

                        <span className='mx-4 font-medium'>My Profile</span>
                    </NavLink> */}
                    <button
                        onClick={logOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar