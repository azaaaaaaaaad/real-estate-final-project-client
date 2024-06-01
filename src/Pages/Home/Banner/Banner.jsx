import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/1.jpg'
import img2 from '../../../assets/2.jpg'
import img3 from '../../../assets/3.webp'

const Banner = () => {
    return (
        <div>
             <Carousel>
                <div>
                    <img src={img1} />
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;