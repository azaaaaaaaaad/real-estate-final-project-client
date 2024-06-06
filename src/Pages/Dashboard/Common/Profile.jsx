import useAuth from '../../Hooks/useAuth'
import { Helmet } from 'react-helmet-async'
import useRole from '../../Hooks/useRole'
import { IoMdMail } from 'react-icons/io'
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const { user, loading } = useAuth() || {}
  const [role, isLoading] = useRole()

  console.log(user)

  if (isLoading || loading) {
    return <span className="loading loading-bars loading-lg"></span>
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className='bg-white shadow-lg rounded-2xl w-3/5'>
        <img
          alt='profile'
          src='https://i.ibb.co/ZBy3YRb/modern-eleganct-blue-background-free-vector.jpg'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-3xl h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 px-4 text-xs text-white bg-blue-500 rounded-lg animate-bounce'>
            {role.toUpperCase()}
          </p>
          {/* <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user?.uid}
          </p> */}
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                
                <span className='font-bold text-black flex items-center gap-2'>
                <FaUser /> {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                <span className='font-bold text-black flex items-center gap-2'><IoMdMail /> {user?.email}</span>
              </p>

              {/* <div>
                <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                  Update Profile
                </button>
                <button className='bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                  Change Password
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile