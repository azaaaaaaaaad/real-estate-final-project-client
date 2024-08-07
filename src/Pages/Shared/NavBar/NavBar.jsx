import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import AgentRequestModal from "../../../components/Modal/AgentRequestModal";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";


const NavBar = () => {
    const axiosSecure = useAxiosSecure()
    const { user, logOut } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    //for modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const modalHandler = async () => {
        console.log('i want to be an agent');
        try {
            const currentUser = {
                email: user?.email,
                role: 'user',
                status: 'Requested',
            }
            const { data } = await axiosSecure.put(
                `/user`,
                currentUser)
            console.log(data);
            if (data.modifiedCount > 0) {
                toast.success('success! please wait for admin confirmation')
            } else {
                toast.success('Please!, wait for admin approval')
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message)
        }finally{
            closeModal()
        }
    }

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/allProperties'}>All Properties</Link></li>
        <li><Link to={'/dashboard'}>Dashboard</Link></li>

    </>

    return (
        <div>
            <div className="navbar  max-w-screen-xl mx-auto bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost text-xl font-semibold">Real Estate</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* Become A Host btn */}
                    {/* <div className='hidden md:block'>
                        {!user && (
                        <button
                            disabled={!user}
                            onClick={() => setIsModalOpen(true)}
                            className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                        >
                            Host your home
                        </button>
                        // {/* )} */}
                    {/* </div> */} 
                    {/* agent modal */}
                    {/* <AgentRequestModal isOpen={isModalOpen} closeModal={closeModal} modalHandler={modalHandler}></AgentRequestModal> */}


                    
                    {
                        user ? <><button onClick={handleLogout} className="btn btn-ghost">LogOut</button></> : <><Link to={'/login'} className="btn">Login</Link></>
                    }

                </div>
            </div>
        </div>
    );
};

export default NavBar;