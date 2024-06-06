import React from 'react';
import MenuItem from './MenuItem';
import { FaHome } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { FaListUl } from "react-icons/fa";


const UserMenu = () => {
    return (
        <>
        <MenuItem
          icon={FaListUl}
          label='Wishlist'
          address='wishlist'
        />

        <MenuItem
          icon={FaHome}
          label='Property bought'
          address='property-bought'
        />

        <MenuItem
          icon={MdOutlineRateReview}
          label='My reviews'
          address='reviews'
        />
  
        {/* <div className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
          <GrUserAdmin className='w-5 h-5' />
  
          <span className='mx-4 font-medium'>Become An Agent</span>
        </div> */}
      </>
    );
};

export default UserMenu;