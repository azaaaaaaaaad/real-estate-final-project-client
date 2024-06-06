import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { FaHome } from "react-icons/fa";
import { RiSpeakFill } from "react-icons/ri";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
       icon={FaUserCog} 
       label='Manage Users' 
       address='manage-users' 
       />
      <MenuItem
       icon={FaHome} 
       label=' Manage Properties' 
       address='manage-properties' 
       />
      <MenuItem
       icon={RiSpeakFill} 
       label='Manage reviews' 
       address='manage-reviews' 
       />
    </>
  )
}

export default AdminMenu