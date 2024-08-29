import React, { useEffect } from "react";
import './OurMission.css';
import ScrollReveal from 'scrollreveal';
import img from '../images/plant.jpg';

function OurMission() {
    useEffect(() => {
        ScrollReveal({
            reset: true,
            distance: '60px',
            duration: 2500,
            delay: 400
        })

        ScrollReveal().reveal('.mission-title', {delay: 600, origin: 'left'});
        ScrollReveal().reveal('#mission .image', {delay: 600, origin: 'top'});
        ScrollReveal().reveal('#mission .info', {delay: 800, origin: 'bottom'});
    },[]);

    return (
        <>
        <section id='mission'>
            <div className='container-mission'>
                <h3 className='mission-title'>Our Mission</h3>
                <div className='content'>
                    <div className='image'>
                        <img src={img} alt="Plant"/>
                    </div>
                    <div className='info'>
                        <h4 className='info-title'>What is Our Goal?</h4>
                        <p>At <b>SOIL</b>, the mission is to empower and enrich lives through innovative solutions that promote sustainability, health, and education.</p>
                        <p>We are committed to creating high-quality, eco-friendly products and services that not only meet the needs of our customers but also contribute positively to the community and the environment. Our goal is to inspire change and make a lasting impact, ensuring a better future for generations to come.</p>
                        <p>We believe in the power of collaboration, integrity, and excellence in driving us forward, as we strive to set new standards in our industry and lead by example in our corporate social responsibilities.</p>
                    </div>
                </div>
            </div>
        </section>
        
        </>
    );
}

export default OurMission;