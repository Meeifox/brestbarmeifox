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
    const [selectedBarId, setSelectedBarId] = useState(null);

    useEffect(() => {
        fetch('https://api.brest.bar/items/bars')
            .then(response => response.json())
            .then(data => setBarData(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleBarCardClick = (clickedBarId) => {
        setSelectedBarId(clickedBarId);
    };

    const [showCount, setShowCount] = useState(5); // État local pour suivre le nombre d'éléments à afficher

    const handleToggleShowMore = () => {
        setShowCount(prevCount => prevCount + 5); // Ajoute 5 à chaque clic pour afficher plus d'éléments
    };

    //Handle click for navigation
    const [selectedLocationCoords, setSelectedLocationCoords] = useState<[number, number] | null>(null);
    const updateSelectedLocationCoords = (coords: [number, number] | null) => {
        setSelectedLocationCoords(coords);
    };

    return (
        <div className='relative z-10 flex origin-left bg-bg text-white shadow-xl transition-all flex-1 overflow-hidden'>
            <div className='w-2/5 flex flex-col overflow-hidden'>
                <h2 className='text-3xl font-bold text-white px-6 py-4'>Trouver le bar qu'il vous faut <p className='bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent'>selon votre humeur</p></h2>
                <section className='establishment-type justify-center items-center px-6 py-1'>
                <h3 className='text-2xl font-semibold py-2'>Où boire à Brest ?</h3>
                    <div className="button-container flex items-center justify-around gap-8">
                        {buttonsData.map((button) => (
                            <div key={button.id} className="button flex flex-col flex w-[20%] items-center gap-2 font-medium ">
                                <div className='flex aspect-square w-full items-center justify-center rounded-lg bg-[#2c2c2c] text-5xl'>{button.emoji}</div>
                                <div className='text-1xl'>{button.label}</div>
                            </div>
                        ))}
                    </div>
                </section>
                <section className='explore-adress flex flex-col overflow-hidden flex-1'>
                    <div className='sub-menu flex flex-row  items-center justify-between p-7'>
                        <h3 className='text-3xl font-semibold'>Explorez</h3>
                        <button className='bg-violet-500 px-4 py-2 font-semibold rounded-[4px]'>Filtrer ✍️</button>
                    </div>
                    <div className='flex flex-col gap-4 rounded-2xl bg-gray-secondary p-6 text-white overflow-auto flex-1 beautiful-scroll'>
                        {barData.slice(0, showCount).map(bar => (
                            <BarCard key={bar.id} barData={bar} updateSelectedLocationCoords={updateSelectedLocationCoords} isSelected={selectedBarId === bar.id} onBarCardClick={handleBarCardClick} />
                        ))}
                        {barData.length > showCount && (
                            <button
                            className='bg-violet-500 px-4 py-2 font-semibold rounded-[4px]'
                            onClick={handleToggleShowMore}>
                            Afficher plus
                        </button>
                        )}
                    </div>            
                </section>            
            </div>   
            <div className='w-3/5'>
                <BrestMap bars={barData} locationCoords={selectedLocationCoords} selectedBarId={selectedBarId} />
            </div>          
        </div>  
    );
};

export default NavigateMenu;
