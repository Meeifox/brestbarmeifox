import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


interface MapProps {
    bars: {
        id: number;
        name: string;
        location: {
            coordinates: [number, number];
        };
    }[];
}

const BrestMap: React.FC<MapProps & { locationCoords: [number, number] | null }> = ({ bars, locationCoords, selectedBarId }) => {
    const mapRef = React.useRef<any>(null);

    useEffect(() => {
        // Utilisez le changement de locationCoords pour effectuer une navigation sur la carte
        if (mapRef.current && locationCoords) {
            mapRef.current.flyTo(locationCoords, 16, {
                animate: true,
                duration: 1.5, // durée de l'animation en secondes
            });
        }
    }, [locationCoords]);

    return (
        <MapContainer
            ref={mapRef}
            center={locationCoords || [48.3831122, -4.4834526]}
            zoom={locationCoords ? 17 : 13}
            style={{ height: '1000px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {bars.map((bar) => {
                const coordinates = bar.location.coordinates.slice().reverse();
                return (
                    <Marker
                        key={bar.id}
                        position={coordinates}
                        icon={
                            new L.Icon({
                              iconUrl: selectedBarId === bar.id ? 'images/selectedMarker.png' : 'images/marker.png',
                              iconSize: selectedBarId === bar.id ? [48, 48] : [32,32], // Ajustez la taille selon vos besoins
                              iconAnchor: selectedBarId === bar.id ? [32, 48] : [16,32], // Point d'ancrage de l'icône
                              popupAnchor: selectedBarId === bar.id ? [-8, -38] : [0, -32], // Point d'ancrage du popup
                            })
                          }
                    >
                        <Popup>{bar.name}</Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default BrestMap;
