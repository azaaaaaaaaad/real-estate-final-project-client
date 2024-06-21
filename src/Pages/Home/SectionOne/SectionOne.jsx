import React, { useEffect, useState } from 'react';
import SectionOneCard from './SectionOneCard';

const SectionOne = () => {
    const [properties, setProperties] = useState([])
    useEffect(() => {
        fetch(`https://real-state-server-nine.vercel.app/allProperties`)
            .then(res => res.json())
            .then(data => {
                const verified = data.filter(item => item.verification_status === 'Pending')
                setProperties(verified)
            })
    }, [])
    return (
        <div>
        <h2 className='text-2xl text-center font-semibold mb-6'>Upcoming Properties</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-4">
            {
                properties.map(item =>
                    <SectionOneCard
                        key={item._id}
                        item={item}>
                    </SectionOneCard>)
            }
        </div>
    </div>
    );
};

export default SectionOne;