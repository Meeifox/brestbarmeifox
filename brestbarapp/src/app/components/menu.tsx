'use client'
import React, { useState, useEffect } from 'react';
import BarCard from './barCard';
import 'leaflet/dist/leaflet.css';
import BrestMap from './brestMap';  

const NavigateMenu = () => {
    const buttonsData = [
        { id: 1, label: 'Cave', emoji: '🍷' },
        { id: 2, label: 'Brasserie', emoji: '🍺' },
        { id: 3, label: 'Bar', emoji: '🍹' },
    ];

    const [barData, setBarData] = useState([]);

    useEffect(() => {
        fetch('https://api.brest.bar/items/bars')
            .then(response => response.json())
            .then(data => setBarData(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2>Trouver le bar qu'il vous faut selon votre humeur</h2>
            <section className='establishment-type'>
                <h3>Où boire à Brest ?</h3>
                <div className="button-container">
                    {buttonsData.map((button) => (
                        <div key={button.id} className="button">
                            <span>{button.emoji}</span>
                            <span>{button.label}</span>
                        </div>
                    ))}
                </div>
            </section>
            <section className='explore-adresse'>
                <div className='sous-menu'>
                    <h3>Explorez</h3>
                    <button>Filtrer ✍️</button>
                    <div>
                        {barData.map(bar => (
                            <BarCard key={bar.id} barData={bar} />
                        ))}
                    </div>
                </div>
                <BrestMap />
            </section>
        </div>
    );
};

export default NavigateMenu;
