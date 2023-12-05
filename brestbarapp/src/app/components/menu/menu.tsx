'use client'
import React, { useState, useEffect } from 'react';
import BarCard from '../barCard/barCard';
import 'leaflet/dist/leaflet.css';
import BrestMap from '../brestMap';
import styles from './menu.module.css';
import {BarCardProps, buttonsData} from '../../utils/constants'

const NavigateMenu = () => {
    

    const [barData, setBarData] = useState<BarCardProps["barData"][] | never[]>([]);

    const [selectedBarId, setSelectedBarId] = useState<number | null>(null); 

    const [selectedType, setSelectedType] = useState<number | null>(null);
   
    const [isFilterOpen, setIsFilterOpen] = useState(false); 

  
    useEffect(() => {
      fetch('https://api.brest.bar/items/bars')
        .then(response => response.json())
        .then(data => setBarData(data.data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    const handleBarCardClick = (clickedBarId: number) => {
      setSelectedBarId(clickedBarId);
    };

    const [showCount, setShowCount] = useState(5); 
  
    const handleToggleShowMore = () => {
      setShowCount(prevCount => prevCount + 5); 
    };
    
    const [selectedLocationCoords, setSelectedLocationCoords] = useState<[number, number] | null>(null);
    const updateSelectedLocationCoords = (coords: [number, number] | null) => {
      setSelectedLocationCoords(coords);
    };
  
    const filter = (buttonType: number) => {
      selectedType != buttonType ? setSelectedType(buttonType) : setSelectedType(null);

      setShowCount(5);
    };
      const toggleFilter = () => {
      setIsFilterOpen(prevState => !prevState);
    };

    return (
        <div className='relative z-10 flex origin-left bg-bg text-white shadow-xl transition-all flex-1 overflow-hidden bg-stone-900'>
            <div className='w-2/5 flex flex-col overflow-hidden'>
                <h2 className='text-3xl font-bold text-white px-6 py-4 shadow-xl'>Trouvez le bar qu'il vous faut <p className='bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent'>selon votre humeur</p></h2>
                <div className="w-full border border-stone-800"></div>
                <section className='establishment-type justify-center px-6 py-1'>
                    <span className='flex justify-between mb-2'>
                        <h3 className='text-2xl font-semibold py-2'>Où boire à Brest ?</h3>
                        <button className='bg-violet-500 px-3 py-1 font-semibold rounded-[4px]' onClick={toggleFilter}>Filtrer ✍️</button>
                    </span>
                    <div className="button-container overflow-x-auto flex gap-8">
                    {isFilterOpen && (
                            <>
                        {buttonsData.map((button) => (
                            <div key={button.id} className={`button flex flex-col flex min-w-[7rem] items-center gap-2 font-medium ${styles.menuItem} `} onClick={() => filter(button.type)}>
                                <div className={`flex aspect-square ${button.type == selectedType ? 'bg-lime-700' : ''} w-full items-center justify-center rounded-lg bg-[#2c2c2c] text-2xl`}>{button.emoji}</div>
                                <div className='text-1xl'>{button.label}</div>
                            </div>
                        ))}
                        </>
                    )}
                    </div>
                </section>
                <div className="w-full border border-stone-800"></div>
                <section className='explore-adress flex flex-col overflow-hidden flex-1'>
        <div className='sub-menu flex flex-row  items-center justify-between p-7 shadow-xl'>
          <h3 className='text-3xl font-semibold'>Explorez</h3>
        </div>
        <div className='flex flex-col gap-4 rounded-2xl bg-gray-secondary p-6 text-white overflow-auto flex-1 beautiful-scroll'>
          {barData
              .filter(bar => selectedType === null || bar.type.includes(selectedType))
              .slice(0, showCount)
              .map(bar => (
                <BarCard key={bar.id} barData={bar} updateSelectedLocationCoords={updateSelectedLocationCoords} onBarCardClick={handleBarCardClick} />
              ))}
          {barData.length > showCount && barData
            .filter(bar => selectedType === null || bar.type.includes(selectedType))
            .length > showCount && (
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
                <BrestMap bars={barData} locationCoords={selectedLocationCoords} selectedBar={selectedBarId} />
            </div>         
        </div>
  );
};

export default NavigateMenu;
