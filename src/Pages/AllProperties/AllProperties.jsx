import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import property from '../../assets/property.jpg'
import AllPropertiesCard from './AllPropertiesCard';

const AllProperties = () => {

    const [properties, setProperties] = useState([])
    useEffect(() => {
        fetch(`https://real-state-server-nine.vercel.app/allProperties`)
            .then(res => res.json())
            .then(data => {
                const verified = data.filter(item => item.verification_status === 'Verified')
                setProperties(verified)
            })
    }, [])

    return (
        <div>
            <Helmet>
                <title>Real Estate | All Properties</title>
            </Helmet>
            <Cover img={property} title={`All Properties`} description={`We provide comprehensive property information, including photos, descriptions, and pricing details....`}></Cover>
            <h2 className='text-2xl text-center font-semibold mb-6'>All Properties</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-4">
                {
                    properties.map(item =>
                        <AllPropertiesCard
                            key={item._id}
                            item={item}>
                        </AllPropertiesCard>)
                }
            </div>
        </div>
    );
};

export default AllProperties;