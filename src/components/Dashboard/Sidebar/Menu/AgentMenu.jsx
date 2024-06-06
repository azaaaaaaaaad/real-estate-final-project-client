import React from 'react';
import MenuItem from './MenuItem';
import { MdAddHomeWork, MdOutlineBroadcastOnHome } from 'react-icons/md';
import { RiHomeGearFill } from 'react-icons/ri';
import { FaMoneyBillTransfer } from 'react-icons/fa6';

const AgentMenu = () => {
    return (
        <>
            {/* Add Property */}
            <MenuItem label='Add Property' address='/dashboard/add-property' icon={MdAddHomeWork}></MenuItem>


            {/* My added properties */}
            <MenuItem label='My added properties' address='/dashboard/my-added-properties' icon={RiHomeGearFill}></MenuItem>

            {/* my-sold-properties*/}
            <MenuItem label='My sold properties' address='/dashboard/my-sold-properties' icon={FaMoneyBillTransfer}></MenuItem>

            {/* requested-properties*/}
            <MenuItem label='Requested properties' address='/dashboard/requested-properties' icon={MdOutlineBroadcastOnHome}></MenuItem>
        </>
    );
};

export default AgentMenu;