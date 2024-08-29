import React, { useState, useEffect, useContext } from "react";
import "./Products.css";
import { getProducts } from '../data/repository';
import CartContext from './CartContext';

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

function Products() {
    const { addToCart } = useContext(CartContext);  
    const [specials, setSpecials] = useState([]);

    useEffect(() => {
        getProducts()
            .then(response => {
                console.log("Fetched products:", response); // Debugging: log fetched products
                const specialsMapped = response.map(special => ({
                    ...special,
                    price: `$${special.price.toFixed(2)}`, // Ensure price is formatted correctly
                    image: imageMap[special.name.toLowerCase()]  
                }));
                console.log("Mapped specials:", specialsMapped); // Debugging: log mapped specials
                setSpecials(specialsMapped);
            })
            .catch(error => {
                console.error("There was an error fetching the specials!", error);
            });
    }, []);

    return (
        <>
        <div className='header'>
            <h3>Weekly Specials</h3>
        </div>
        <div className='card-container'>
            {specials.map(special => (
                <div className='card' key={special.id}>
                    <img src={special.image} alt={special.name} />
                    <div className='card-content'>
                        <h4>{special.name}</h4>
                        <h3>{special.price}</h3>
                        <button className='btn' onClick={() => addToCart({ ...special, img: special.image })}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default Products;
