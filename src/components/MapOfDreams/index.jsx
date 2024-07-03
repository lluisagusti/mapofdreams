import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import goodDream from '../ui/placeholders/mapofdreams-good-border.png';
import badDream from '../ui/placeholders/mapofdreams-bad-border.png';
import weirdDream from '../ui/placeholders/mapofdreams-weird-border-2.png';

const dreamIcons = {
  good: new L.Icon({
    iconUrl: goodDream,
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -32],
  }),
  bad: new L.Icon({
    iconUrl: badDream,
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -32],
  }),
  weird: new L.Icon({
    iconUrl: weirdDream,
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -32],
  }),
};

const mapBounds = [
  [-90, -180],
  [90, 180]
];

const MapEvents = ({ setNewDream, setIsPopupOpen }) => {
  const longPressTimer = useRef(null);
  const longPressDuration = 500;
  const map = useMapEvents({
    mousedown: (e) => {
      longPressTimer.current = setTimeout(() => {
        const { lat, lng } = e.latlng;
        setNewDream({ lat, lng, isOpen: true });
        setIsPopupOpen(true);
      }, longPressDuration);
    },
    mouseup: () => {
      clearTimeout(longPressTimer.current);
    },
    mousemove: () => {
      clearTimeout(longPressTimer.current);
    },
    touchstart: (e) => {
      longPressTimer.current = setTimeout(() => {
        const touch = e.touches[0];
        const point = map.mouseEventToLatLng(touch);
        setNewDream({ lat: point.lat, lng: point.lng, isOpen: true });
        setIsPopupOpen(true);
      }, longPressDuration);
    },
    touchend: () => {
      clearTimeout(longPressTimer.current);
    },
    touchmove: () => {
      clearTimeout(longPressTimer.current);
    },
  });

  return null;
};

// const baseLayers = {
//   Street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//   Satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//   Topography: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
// };

// const defaultLayer = "Satellite"

const DreamTrackerMap = () => {
  const [dreams, setDreams] = useState([]);
  const [newDream, setNewDream] = useState({ type: 'good', description: '', lat: null, lng: null });
  const [mapCenter] = useState([0, 0]);
  // const [activeLayer, setActiveLayer] = useState(defaultLayer);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setDreams([
      { id: 1, type: 'good', lat: 40.7128, lng: -74.0060, description: 'Flying over New York' },
      { id: 2, type: 'bad', lat: 48.8566, lng: 2.3522, description: 'Crazy Paris Chase' },
      { id: 3, type: 'weird', lat: -33.8688, lng: 151.2093, description: 'Surfing with kangaroos in Sydney' },
    ]);
  }, []);

  return (
    <div className="dream-tracker h-screen w-screen relative">
      <MapContainer
        center={mapCenter}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        maxBounds={mapBounds}
        worldCopyJump={false}
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        <MapEvents setNewDream={setNewDream} setIsPopupOpen={setIsPopupOpen} />
        {dreams.map((dream) => (
          <Marker
            key={dream.id}
            position={[dream.lat, dream.lng]}
            icon={dreamIcons[dream.type]}
          >
            <Popup>{dream.description}</Popup>
          </Marker>
        ))}
        {newDream.isOpen && (
          <Popup
            position={[newDream.lat, newDream.lng]}
            onClose={() => {
              setNewDream({ ...newDream, isOpen: false });
              setIsPopupOpen(false);
            }}
          >
            <div>Add new dream here. Lat: {newDream.lat}, Lng: {newDream.lng}</div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default DreamTrackerMap;