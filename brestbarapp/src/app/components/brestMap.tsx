import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
    bars: {
        id: number;
        name: string;
        location: {
            coordinates: [number, number];
        };
    }[];
}

const BrestMap: React.FC<MapProps> = ({ bars }) => {
    return (
        <MapContainer
            center={[48.3831122, -4.4834526]} // Coordonnées de Brest (à ajuster selon vos besoins)
            zoom={13}
            style={{ height: '1000', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {bars.map((bar) => (
                <Marker
                    key={bar.id}
                    position={bar.location.coordinates}
                >
                    <Popup>{bar.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default BrestMap;
