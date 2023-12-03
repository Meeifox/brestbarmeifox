import React from 'react';

// Fonction pour obtenir le jour de la semaine à partir du numéro
const getDayOfWeek = (dayNumber) => {
    const daysOfWeek = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    return daysOfWeek[parseInt(dayNumber, 10)];
};

// Fonction pour essayer de parser les heures d'ouverture
const tryParseOpeningHours = (hoursString) => {
    try {
        const hoursObject = JSON.parse(hoursString || '{}');

        // Vérifier si hoursObject est un objet avant d'utiliser Object.entries
        if (typeof hoursObject === 'object' && hoursObject !== null) {
            return Object.entries(hoursObject)
                .map(([day, hours]) => `${getDayOfWeek(day)}: ${hours}`);
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
        name: string;
        location: {
            distance: string;
        };
        address: string;
        rating: string;
        formatted_phone_number: string;
        user_ratings_total: number;
        opening_hours?: string;
        website: string;
    };
}

const BarCard: React.FC<BarCardProps> = ({ barData }) => {
    const {
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

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-2xl bg-gray-secondary p-6 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex w-4/5 flex-col">
                        <p className="font-bold uppercase text-violet">Bar</p>
                        <h2 className="text-2xl font-bold">{name}</h2>
                        <p className="relative truncate text-violet">🏃&zwj;♂️ <strong className="uppercase">{location.distance} KM</strong> - {address}</p>
                    </div>
                    <button type="button" aria-label="show on map" className="aspect-square rounded-full bg-violet p-4">👁️ </button>
                </div>
                <div className="flex items-center gap-3">
                    <div className="rounded-full px-4 font-semibold bg-sportif/30 text-sportif">Au chaud</div>
                    <div className="rounded-full px-4 font-semibold bg-sportif/30 text-sportif">✈️ Exotique</div>
                </div>
            </div>
        </div>
    );
};

export default BarCard;
