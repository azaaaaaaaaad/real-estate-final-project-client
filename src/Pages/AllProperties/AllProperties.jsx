import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import property from '../../assets/property.jpg'
import AllPropertiesCard from './AllPropertiesCard';

const AllProperties = () => {
    const [asc, setAsc] = useState(true)
    const [search, setSearch] = useState('')
    const [properties, setProperties] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/allProperties?sort=${asc? 'asc' : 'desc'}&search=${search}`)
            .then(res => res.json())
            .then(data => {
                const verified = data.filter(item => item.verification_status === 'Verified')
                setProperties(verified)
            })
    }, [asc, search])


    const handleSearch = e =>{
        e.preventDefault();
        const searchText = e.target.search.value;
        // console.log(searchText);
        setSearch(searchText);
    }

    return (
        <div>
            <Helmet>
                <title>Real Estate | All Properties</title>
            </Helmet>
            <Cover img={property} title={`All Properties`} description={`We provide comprehensive property information, including photos, descriptions, and pricing details....`}></Cover>
            <div className='text-2xl text-center font-semibold mb-6'>
                <h2 className='text-2xl text-center font-semibold mb-6'>All Properties</h2>
                <div className='flex items-center justify-around'>
                    <button
                    onClick={()=> setAsc(!asc)}
                        className='btn btn-secondary'>
                        {asc ? 'Price: High To Low' : 'Price: Low To High'}
                    </button>

                    <form onSubmit={handleSearch} className='flex gap-2'>
                    <input type="text" name="search" id="" className='border border-black rounded-lg'/>
                    <input type="submit" value="Search" className="btn btn-primary"/>
                </form>

                </div>
            </div>
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