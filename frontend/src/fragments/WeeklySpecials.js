import React from 'react';
import './WeeklySpecials.css';
import Slider from './Slider';


function TodaysSpecials(){ 
    return (
        <div className='mx-[300[x] mt-[45px]'>

            <div data-aos='fade-down' data-aos-duration='200' data-aos-easing='ease-in-out' className='section-title'>
                <div className='section-line'></div>
                <h1>This Week's Specials</h1>
                <div className='section-line'></div>
            </div>
            <div>
                <Slider />
            </div>
        </div>
    );
};

export default TodaysSpecials;