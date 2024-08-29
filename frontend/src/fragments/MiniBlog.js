import React, { useEffect } from "react";
import './MiniBlog.css';
import ScrollReveal from 'scrollreveal';
import img2 from '../images/rock.jpg';

function MiniBlog() {
    useEffect(() => {
        ScrollReveal({
            reset: true,
            distance: '60px',
            duration: 2500,
            delay: 400
        })

        ScrollReveal().reveal('.miniblog-title', {delay: 600, origin: 'left'});
        ScrollReveal().reveal('.miniblog .image2', {delay: 600, origin: 'bottom'});
        ScrollReveal().reveal('.miniblog .info2', {delay: 800, origin: 'top'});
    },[]);

    return (
        <>
        <section className='miniblog'>
            <div className='container2'>
                <h3 className='miniblog-title'>Organic Insights</h3>
                <div className='content2'>
                    <div className='image2'>
                        <img src={img2} alt="Rock"/>
                    </div>
                    <div className='info2'>
                        <h4 className='info-title2'>Delving into the World of Organic Eating</h4>
                        <p>Embark on a journey through the flavors and wisdom of organic living. Our blog offers a glimpse into the sustainable and healthful benefits of organic foods, blending expert advice with tantalizing recipes. </p>
                        <p>Discover how embracing organic principles can transform your health and contribute to a thriving planet.</p>
                        <a className='read-more-btn' href='/'>&gt;&gt; Read More</a>
                        
                     </div>
                </div>
            </div>
        </section>
        
        </>
    );
}

export default MiniBlog;