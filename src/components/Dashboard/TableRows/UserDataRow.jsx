import { useMutation } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import useAxiosSecure from '../../../Pages/Hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import UpdateUserModal from '../../Modal/UpdateUserModal'
import { useState } from 'react'
import useAuth from '../../../Pages/Hooks/useAuth'


const UserDataRow = ({ user, refetch, handleDelete }) => {
  const { user: loggedInUser } = useAuth()
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }
  const axiosSecure = useAxiosSecure()
  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(`/users/update/${user?.email}`, role)
      return data
    },
    onSuccess: (data) => {
      refetch()
      setIsOpen(false)
      console.log(data)
      toast.success('user role updated successfully')
    }
  })

  const modalHandler = async selected => {
    if (loggedInUser.email === user.email) {
      toast.error('action not allowed')
      return setIsOpen(false)
    }
    console.log('user role updated', selected);
    const userRole = {
      role: selected,
      status: 'Verified',
    }

    try {
      await mutateAsync(userRole)
      console.log(user);
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }


  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
              } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>


      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        />
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Make Fraud</span>
        </span>
        {/* Update User Modal */}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <button
            onClick={() => handleDelete(user._id)}
            className='relative'
          >Delete User</button>
        </span>
        {/* Update User Modal */}
      </td>





    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow