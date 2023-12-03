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

    const [showCount, setShowCount] = useState(5); // État local pour suivre le nombre d'éléments à afficher

    const handleToggleShowMore = () => {
        setShowCount(prevCount => prevCount + 5); // Ajoute 5 à chaque clic pour afficher plus d'éléments
    };

    return (
        <div className='relative z-10 flex origin-left bg-bg text-white shadow-xl transition-all flex-1 overflow-hidden'>
            <div className='w-2/5 flex flex-col overflow-hidden'>
                <h2 className='text-4xl font-bold text-white'>Trouver le bar qu'il vous faut selon votre humeur</h2>
                <section className='establishment-type'>
                <h3 className='text-2xl font-semibold'>Où boire à Brest ?</h3>
                    <div className="button-container flex items-center gap-8">
                        {buttonsData.map((button) => (
                            <div key={button.id} className="button flex flex-col flex w-[20%] flex-col items-center gap-2 font-medium">
                                <div className='flex aspect-square w-full items-center justify-center rounded-lg bg-[#2c2c2c] text-5xl'>{button.emoji}</div>
                                <div className='transition-colors'>{button.label}</div>
                            </div>
                        ))}
                    </div>
                </section>
                <section className='explore-adress flex flex-col overflow-hidden flex-1'>
                    <div className='sub-menu flex flex-row  items-center justify-between'>
                        <h3 className='text-2xl font-semibold'>Explorez</h3>
                        <button className='bg-violet-500 px-4 py-2 font-semibold rounded-[4px]'>Filtrer ✍️</button>
                    </div>
                    <div className='flex flex-col gap-4 rounded-2xl bg-gray-secondary p-6 text-white overflow-auto flex-1 beautiful-scroll'>
                        {barData.slice(0, showCount).map(bar => (
                            <BarCard key={bar.id} barData={bar} />
                        ))}
                        {barData.length > showCount && (
                            <button onClick={handleToggleShowMore}>
                                Afficher plus
                            </button>
                        )}
                    </div>            
                </section>            
            </div>   
            <div className='w-3/5'>
                <BrestMap bars={barData} />
            </div>          
        </div>  
    );
};

export default NavigateMenu;
