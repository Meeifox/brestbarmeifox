export const buttonsData = [
    { id: 1, label: 'Cave', emoji: '🍷', type: 1 },
    { id: 2, label: 'Brasserie', emoji: '🍺', type: 2 },
    { id: 3, label: 'Bar', emoji: '🍹', type: 21 },
    { id: 4, label: 'Pub', emoji: '🍻', type: 3 },
    { id: 5, label: 'Lounge', emoji: '🍸', type: 4 },
    { id: 6, label: 'Discothèque', emoji: '🎉', type: 5 },
    { id: 7, label: 'Café', emoji: '☕', type: 6 },
    { id: 8, label: 'Salle de jeux', emoji: '🎮', type: 7 },
    { id: 9, label: 'Terrasse', emoji: '🌞', type: 8 },
    { id: 10, label: 'Karaoké', emoji: '🎤', type: 9 },
    { id: 11, label: 'Bar à vin', emoji: '🍇', type: 10 },
    { id: 12, label: 'Microbrasserie', emoji: '🍻', type: 11 },
    { id: 13, label: 'Irish Pub', emoji: '🍀', type: 12 },
    { id: 14, label: 'Bar à cocktails', emoji: '🍸', type: 13 },
    { id: 15, label: 'Bar de plage', emoji: '🏖️', type: 14 },
    { id: 16, label: 'Bar à jus', emoji: '🥤', type: 15 },
    { id: 17, label: 'Bar à tapas', emoji: '🍢', type: 16 },
    { id: 18, label: 'Pub anglais', emoji: '🇬🇧🍺', type: 17 },
    { id: 19, label: 'Bar à chicha', emoji: '💨', type: 18 },
    { id: 20, label: 'Bar sportif', emoji: '🏀', type: 19 },
    { id: 21, label: 'Bar karaoké', emoji: '🎤🎵', type: 20 },
];

export interface BarCardProps {
    barData: {
        id: number;
        name: string;
        location: {
            coordinates: number [];
        };
        category: number[];
        type: number[];
        address: string;
        rating: string;
        formatted_phone_number: string;
        user_ratings_total: number;
        opening_hours?: string;
        website: string;
    };
    updateSelectedLocationCoords: (coords: [number, number] | null) => void;
    onBarCardClick: (id: number) => void;
}