import React from 'react';
import Banner from './Banner/Banner';
import Advertisement from './Advertisement/Advertisement';
import Review from './Review/Review';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Review></Review>
        </div>
    );
};

export default Home;