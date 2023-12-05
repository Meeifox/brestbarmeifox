'use client'
import { useState } from "react";
import styles from './navBar.module.css';

export default function NavBar() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [breakAll, setBreakAll] = useState(false);

  const handleConfirmationClick = () => {
    setShowConfirmation(true);
  };

  const handleYesClick = () => {
    // Trigger the spin effect
    setBreakAll(true);

    setShowConfirmation(false);

    setTimeout(() => {
      setBreakAll(false);
    }, 8000); // Adjust the duration as needed
  };

  const handleNoClick = () => {
    setShowConfirmation(false);
  };

  return (
    <div className={`z-20 flex w-full flex-col items-start gap-4 bg-bg p-4 text-[28px] shadow-md transition-colors lg:flex-row lg:items-center lg:justify-between bg-stone-900 shadow-xl`}>
      <div className="beer-emoji flex flex-row flex items-center text-white pr-2">
        🍻<h2 className="flex flex-row text-4xl">Brest&nbsp;<p className='bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent'>bar</p></h2>
      </div>
      <button type="button" className="rounded-[4px] bg-violet-500 px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105 flex flex-row" onClick={handleConfirmationClick}>
        🙋‍♀️ <p>Faire une demande</p>
      </button>

      {showConfirmation && (
        <div className={`${styles.confirmationModal} bg-black text-white flex flex-col justify-center items-center shadow-xl border-pink-800`}>
          <p>Je savais pas trop quoi mettre ici, cliquez sur Oui c'est rigolo (8s)</p>
          <div className='w-96 flex justify-around'>
            <button onClick={handleYesClick} className="rounded-[4px] bg-red-500 px-4 py-2 font-bold text-stone-300 transition-transform hover:scale-110 flex flex-row">Oui 👼</button>
            <button onClick={handleNoClick} className="rounded-[4px] bg-violet-500 px-4 py-2 font-bold text-white transition-transform hover:scale-110 flex flex-row">Non </button>
          </div>
        </div>
      )}
      {breakAll && (
        <div className={`${styles.breakAll}`}>
          <div className={`${styles.glowing}`}>
              <span></span>
              <span></span>
              <span></span>
          </div>
          <div className={`${styles.glowing}`}>
              <span></span>
              <span></span>
              <span></span>
          </div>
          <div className={`${styles.glowing}`}>
              <span></span>
              <span></span>
              <span></span>
          </div>
          <div className={`${styles.glowing}`}>
              <span></span>
              <span></span>
              <span></span>
          </div>
        </div>
      )}
      
    </div>
  );
}
