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
        <div>
            <h2>{name}</h2>
            <p>{location.distance} KM - {address}</p>
            <p>Rating: {rating}</p>
            <p>Phone: {formatted_phone_number}</p>
            <p>Total Ratings: {user_ratings_total}</p>
            {opening_hours && (
                <p>Opening Hours: {openingHoursArray.join(', ')}</p>
            )}
            <p>Website: <a href={website} target="_blank" rel="noopener noreferrer">{website}</a></p>
        </div>
    );
};

export default BarCard;
