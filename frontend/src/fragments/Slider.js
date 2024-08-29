import React, { useState, useEffect, useContext } from 'react';
import './Slider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import CartContext from './CartContext';
import axios from 'axios';

import tomatoImg from '../images/food/tomato.jpg';
import bananaImg from '../images/food/banana.jpg';
import cucumberImg from '../images/food/cucumber.jpg';
import orangeImg from '../images/food/orange.jpg';
import capsicumImg from '../images/food/capsicum.jpg';
import strawberryImg from '../images/food/strawberry.jpg';  

const imageMap = {
    'tomato': tomatoImg,
    'banana': bananaImg,
    'cucumber': cucumberImg,
    'orange': orangeImg,
    'capsicum': capsicumImg,
    'strawberry': strawberryImg
};

function Slider() {
    const { addToCart } = useContext(CartContext);
    const [specials, setSpecials] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                const specialsMapped = response.data.map(special => ({
                    ...special,
                    image: imageMap[special.name.toLowerCase()]  
                }));
                setSpecials(specialsMapped);
            })
            .catch(error => {
                console.error("There was an error fetching the specials!", error);
            });
    }, []);

    return (
        <div>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className='mySwiper'
            >
                {specials.map((special, index) => (
                    <SwiperSlide key={index}>
                        <div className='hoverIncrease'>
                            <img src={special.image} alt={special.name} />
                            <div className='products'>
                                <h1>{special.name}</h1>
                                <h2>${special.price}</h2>
                                <div className='price-underline'></div>
                                <div className='select-btn'>
                                <button className='btn' onClick={() => addToCart({ ...special, img: special.image })}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Slider;
