import React from "react";
import "./MiniTips.css";

import gardenpic from '../images/homegarden.jpg';

function MiniTips() {
    return (
        <div className='box-container'>
            <div className='box'>
                <div className='box-text'>
                    <h3>Looking to start growing at home?</h3>
                    <p className='small-info'>Our 10 steps beginner guide has everything you need today to get started with making your own delicious fresh fruit and vegetable gardens right from the comfort of your home.</p>
                    <a className='check-it-out-btn' href='/homegarden'>&gt;&gt; Check it out</a>
                </div>
                <div className='box-image'>
                    <img src={gardenpic} alt='Home Garden' />
                </div>
            </div>
        </div>
    );
}

export default MiniTips;