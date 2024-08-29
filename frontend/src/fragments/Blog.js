import React from "react";
import "./Blog.css";
import sidepic from '../images/gardenexample.jpg';

function Blog() {
    return (
        <>
        <div className='header-blog'>
                <h3>Setting Up a Home Garden</h3>
        </div>
        <div className='title'>
            <h1>How to Start a Garden: 10 Easy Steps for Beginners</h1>
            <h4>This step-by-step guide to starting a garden will set you up for success.</h4>
            <h5>By William Truong | Updated on April 7, 2024</h5>
        </div>
        <div class='container-blog'>
            <div class='content-blog'>
                <div class="sidebar">
                    <img src={sidepic} alt='Garden' className='sidebar'/>
                </div>
                <h2>1. Choose the Right Location</h2>
                <p>
                Look for a spot that gets plenty of sunlight daily. Most vegetables and flowers need about 6 to 8 hours of direct sunlight each day.
                </p>
                <h2>2. Start Small</h2>
                <p>
                Begin with a small area or a few containers to manage the garden easily. A plot of 4x4 feet is a good size for a beginner.
                </p>
                <h2>3. Decide What to Plant</h2>
                <p>
                Select easy-to-grow plants that you like to eat or enjoy looking at. Some beginner-friendly plants include tomatoes, peppers, lettuce, sunflowers, and marigolds.
                </p>
                <h2>4. Check the Soil</h2>
                <p>
                Your garden needs good soil. Use a soil test kit to check the soil's pH and nutrient levels. Amend the soil with compost or other organic matter to improve its quality.
                </p>
                <h2>5. Plan Your Garden Beds</h2>
                <p>
                Decide if you want raised beds, traditional in-ground beds, or containers. Raised beds can make gardening easier on your back and can help avoid soil compaction and improve drainage.
                </p>
                <h2>6. Buy Seeds or Plants</h2>
                <p>
                Purchase seeds or starter plants from a reputable nursery or garden center. Make sure they are suitable for your climate and the current season.
                </p>
                <h2>7. Plant with Care</h2>
                <p>
                Follow the planting instructions on the seed packets or plant tags. Pay attention to the spacing requirements and the recommended planting depth.
                </p>
                <h2>8. Water Properly</h2>
                <p>
                Water your plants regularly. Early morning is the best time to water, as it gives the plants time to absorb moisture before the heat of the day, and helps prevent diseases.
                </p>
                <h2>9. Mulch and Fertilize</h2>
                <p>
                Apply a layer of mulch around your plants to retain moisture, regulate soil temperature, and reduce weed growth. Use a balanced, organic fertilizer to provide necessary nutrients to your plants.
                </p>
                <h2>10. Monitor and Maintain</h2>
                <p>
                Keep an eye on your garden for pests and diseases. Remove weeds regularly, and check the moisture level of the soil to ensure it’s not too dry or overly wet.
                </p>
            </div>
        </div>
        </>
    );
}

export default Blog;
