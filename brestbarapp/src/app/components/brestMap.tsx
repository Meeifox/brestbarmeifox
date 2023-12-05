import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngTuple } from 'leaflet';
import { BarCardProps } from '../utils/constants';


interface MapProps {
    bars: BarCardProps["barData"][];
    locationCoords: [number, number] | null;  
    selectedBar: number | null;  
  }
  
  const BrestMap: React.FC<MapProps> = ({ bars, locationCoords, selectedBar }) => {  
    const mapRef = React.useRef<any>(null);
  
    useEffect(() => {
      // locationCoords pour effectuer une navigation sur la carte
      if (mapRef.current && locationCoords) {
        mapRef.current.flyTo(locationCoords, 16, {
          animate: true,
          duration: 1.5,
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
          const coordinates: L.LatLngTuple = (bar.location.coordinates.slice().reverse() as unknown) as L.LatLngTuple;
          return (
            <Marker
              key={bar.id}
              position={coordinates}
              icon={
                new L.Icon({
                  iconUrl: selectedBar === bar.id ? 'images/selectedMarker.png' : 'images/marker.png',
                  iconSize: selectedBar === bar.id ? [48, 48] : [32, 32],
                  iconAnchor: selectedBar === bar.id ? [32, 48] : [16, 32],
                  popupAnchor: selectedBar === bar.id ? [-8, -38] : [0, -32],
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