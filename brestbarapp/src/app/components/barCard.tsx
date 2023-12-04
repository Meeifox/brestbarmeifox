import React from 'react';
import { useState } from 'react';

const tryParseOpeningHours = (hoursString) => {
    try {
        const hoursObject = JSON.parse(hoursString || '{}');

    
        if (typeof hoursObject === 'object' && hoursObject !== null) {
            return Object.entries(hoursObject)
                .map(([day, hours]) => `${hours}`);
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error parsing opening hours:', error);
        return [];
    }
};


interface BarCardProps {
    barData: {
        id: number;
        name: string;
        location: {
            coordinates: number [];
            distance : string;
        };
        address: string;
        rating: string;
        formatted_phone_number: string;
        user_ratings_total: number;
        opening_hours?: string;
        website: string;
    };
    updateSelectedLocationCoords: (coords: [number, number] | null) => void;
}
const BarCard: React.FC<BarCardProps> = ({ barData, updateSelectedLocationCoords, isSelected, onBarCardClick  }) => {
    const {
        id,
        name,
        location,
        address,
        rating,
        formatted_phone_number,
        user_ratings_total,
        opening_hours,
        website,
    } = barData;

    const openingHoursArray = opening_hours && typeof opening_hours === 'string'
        ? tryParseOpeningHours(opening_hours)
        : [];

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const toggleDetails = () => {
        setIsDetailsOpen(!isDetailsOpen);
        onBarCardClick(id)
    }
    const viewOnMap = (location: number[], e:Event) => {
        e.stopPropagation();
        onBarCardClick(id)
        updateSelectedLocationCoords([location[1], location[0]]);
    }
    return (
        <div className={"flex flex-col gap-4 bg-stone-900 rounded-2xl transition-opacity hover:opacity-70 ${isSelected ? 'selected' : ''}`"} onClick={toggleDetails}>
            <div className="flex flex-col gap-4 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex w-4/5 flex-col">
                        <p className="font-bold uppercase text-violet-500">Bar</p>
                        <h2 className="text-2xl font-bold">{name}</h2>
                        <p className="relative truncate text-violet-500">🏃&zwj;♂️ <strong className="uppercase">{location.distance} KM</strong> - {address}</p>
                    </div>
                    <button
                        type="button"
                        aria-label="show on map"
                        className="aspect-square rounded-full bg-violet-700 p-4"
                        onClick={(e) => viewOnMap(location.coordinates, e)} >
                        👁️
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <div className="rounded-full px-4 font-semibold bg-blue-400 text-blue-900">Au chaud</div>
                    <div className="rounded-full px-4 font-semibold bg-blue-400 text-blue-900">✈️ Exotique</div>
                </div>
            </div>
            <div>
                
                {isDetailsOpen && (
                    <div className="text-violet-400 mt-4 p-4">
                        <div className="border-b border-violet-600 pb-4">
                        <p className="text-lg font-semibold">Informations complémentaires :</p>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                            <p>⭐ Note : {rating}</p>
                            <p>🗨️ Avis : {user_ratings_total}</p>
                            </div>
                            <div>
                            {formatted_phone_number && <p>📞 Tel. {formatted_phone_number}</p>}
                            {website && <a href={website} className='text-purple-400 visited:text-blue-600underline-offset-2'>🔗 Site Web</a>}
                            </div>
                        </div>
                        </div>
                        {openingHoursArray.length > 0 && (
                        <div className="mt-4">
                            <p className="text-lg font-semibold">Heures d'ouverture :</p>
                            <ul className="list-disc pl-6 mt-2">
                            {openingHoursArray.map((hours, index) => (
                                <li key={index}>{hours}</li>
                            ))}
                            </ul>
                        </div>
                        )}
                    </div>
                    )}
            </div>
        </div>
    );
};

export default BarCard;
