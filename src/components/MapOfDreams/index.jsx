import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import goodDream from '../ui/placeholders/mapofdreams-good.png';
import badDream from '../ui/placeholders/mapofdreams-bad.png';
import weirdDream from '../ui/placeholders/mapofdreams-weird-2.png';

const dreamIcons = {
  good: new L.Icon({
    iconUrl: goodDream,
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64],
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

const baseLayers = {
  Street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  Satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  Topography: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
};

const defaultLayer = "Street"

const DreamTrackerMap = () => {
  const [dreams, setDreams] = useState([]);
  const [newDream, setNewDream] = useState({ type: 'good', description: '' });
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [activeLayer, setActiveLayer] = useState(defaultLayer);

  useEffect(() => {
    // Aquí podrías cargar sueños guardados previamente
    // Por ahora, usaremos datos de ejemplo
    setDreams([
      { id: 1, type: 'good', lat: 40.7128, lng: -74.0060, description: 'Flying over New York' },
      { id: 2, type: 'bad', lat: 48.8566, lng: 2.3522, description: 'Chase in Paris' },
      { id: 3, type: 'weird', lat: -33.8688, lng: 151.2093, description: 'Surfing with kangaroos in Sydney' },
    ]);
  }, []);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setNewDream({ ...newDream, lat, lng });
  };

  const handleDreamSubmit = (e) => {
    e.preventDefault();
    if (newDream.lat && newDream.lng && newDream.description) {
      setDreams([...dreams, { ...newDream, id: Date.now() }]);
      setNewDream({ type: 'good', description: '' });
    }
  };

  return (
    <div className="dream-tracker">
      <h1 className="text-2xl font-bold mb-4">Map Of Dreams</h1>
      <MapContainer
        center={mapCenter}
        zoom={3}
        style={{ height: '400px', width: '100%' }}
        onClick={handleMapClick}
      >
        <TileLayer url={baseLayers[activeLayer]} />
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        {dreams.map((dream) => (
          <Marker
            key={dream.id}
            position={[dream.lat, dream.lng]}
            icon={dreamIcons[dream.type]}
          >
            <Popup>{dream.description}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <form onSubmit={handleDreamSubmit} className="mt-4">
        <select
          value={newDream.type}
          onChange={(e) => setNewDream({ ...newDream, type: e.target.value })}
          className="mr-2 p-2 border rounded"
        >
          <option value="good">Good dream</option>
          <option value="bad">Bad dream</option>
          <option value="weird">Weird dream</option>
        </select>
        <input
          type="text"
          value={newDream.description}
          onChange={(e) => setNewDream({ ...newDream, description: e.target.value })}
          placeholder="Describe your dream"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add Dream</button>
      </form>
    </div>
  );
};

export default DreamTrackerMap;