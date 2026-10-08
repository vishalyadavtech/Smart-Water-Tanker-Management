import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, Filter, MapPin, Navigation, Maximize2, Layers, Info, Clock, Truck, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom icons for tankers and user
const createCustomIcon = (color: string, iconType: 'tanker' | 'user') => {
  const iconHtml = iconType === 'tanker' 
    ? `<div class="relative group">
         <div class="absolute -inset-2 bg-${color === 'emerald' ? 'emerald' : 'blue'}-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <div style="background-color: ${color === 'emerald' ? '#10b981' : '#3b82f6'}; width: 40px; height: 40px; border-radius: 14px; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 8px 16px rgba(0,0,0,0.1); transform: rotate(45deg); transition: all 0.3s ease;">
           <div style="transform: rotate(-45deg);">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
               <path d="M10 17h4V5H10v12z"/><path d="M2 17h4V5H2v12z"/><path d="M18 17h4V5h-4v12z"/>
             </svg>
           </div>
         </div>
       </div>`
    : `<div class="relative flex items-center justify-center">
         <div class="absolute w-12 h-12 bg-rose-500/20 rounded-full animate-ping"></div>
         <div style="background-color: #f43f5e; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 8px 16px rgba(244, 63, 94, 0.3); z-index: 10;"></div>
       </div>`;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

const RecenterMap = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapEvents = ({ onClick }: { onClick?: (lat: number, lng: number) => void }) => {
  const map = useMap();
  useEffect(() => {
    if (!onClick) return;
    const handleClick = (e: L.LeafletMouseEvent) => {
      onClick(e.latlng.lat, e.latlng.lng);
    };
    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onClick]);
  return null;
};

interface MapComponentProps {
  center: [number, number];
  zoom?: number;
  tankers?: Array<{
    id: string;
    location: [number, number];
    info: string;
    status: string;
    driver?: string;
    plate?: string;
    capacity?: string;
    lastUpdated?: string;
  }>;
  userLocation?: [number, number];
  route?: [number, number][];
  className?: string;
  showControls?: boolean;
  onMapClick?: (lat: number, lng: number) => void;
  interactive?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  center, 
  zoom = 13, 
  tankers = [], 
  userLocation,
  route,
  className = "h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 relative",
  showControls = true,
  onMapClick,
  interactive = true
}) => {
  const [filter, setFilter] = useState<'all' | 'available' | 'busy'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);
  const [mapZoom, setMapZoom] = useState(zoom);
  const [mapType, setMapType] = useState<'light' | 'dark' | 'satellite'>('light');

  const filteredTankers = tankers.filter(t => {
    const matchesFilter = filter === 'all' || (filter === 'available' ? t.status === 'available' : t.status !== 'available');
    const matchesSearch = (t.driver || '').toLowerCase().includes(searchQuery.toLowerCase()) || (t.plate || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRecenter = () => {
    if (userLocation) {
      setMapCenter(userLocation);
    } else {
      setMapCenter(center);
    }
    setMapZoom(15);
  };

  const getTileUrl = () => {
    switch (mapType) {
      case 'dark':
        return "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
      case 'satellite':
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      default:
        return "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";
    }
  };

  return (
    <div className={`relative w-full h-full transition-all duration-500 ${isMaximized ? 'fixed inset-0 z-[9999] p-8 bg-slate-900/40 backdrop-blur-xl' : ''}`}>
      <div className={className}>
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
            url={getTileUrl()}
          />
          
          <RecenterMap center={mapCenter} zoom={mapZoom} />
          <MapEvents onClick={onMapClick} />
          <ZoomControl position="bottomright" />

          {filteredTankers.map((tanker) => (
            <Marker 
              key={tanker.id} 
              position={tanker.location} 
              icon={createCustomIcon(tanker.status === 'available' ? 'emerald' : 'blue', 'tanker')}
            >
              <Popup className="custom-popup">
                <div className="p-4 min-w-[240px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider ${
                      tanker.status === 'available' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {tanker.status.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Clock size={10} /> {tanker.lastUpdated || 'Just now'}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                        <Navigation size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{tanker.driver || 'Driver'}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tanker.plate || 'MH-04-AB-1234'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Capacity</p>
                        <p className="text-xs font-black text-slate-900">{tanker.capacity || '5,000L'}</p>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Speed</p>
                        <p className="text-xs font-black text-slate-900">24 km/h</p>
                      </div>
                    </div>
                    <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all mt-2">
                      View Full Telemetry
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {userLocation && (
            <Marker position={userLocation} icon={createCustomIcon('rose', 'user')}>
              <Popup className="custom-popup">
                <div className="p-3">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Your Location</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">Mira Road, Mumbai</p>
                </div>
              </Popup>
            </Marker>
          )}

          {route && route.length > 0 && (
            <Polyline positions={route} color="#3b82f6" weight={5} opacity={0.8} dashArray="12, 12" />
          )}
        </MapContainer>

        {showControls && (
          <>
            {/* Top Controls Overlay */}
            <div className="absolute top-6 left-6 right-6 z-[1000] flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-grow max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search fleet by driver or plate..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 text-sm font-bold shadow-2xl shadow-slate-900/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div className="flex gap-2 bg-white/90 backdrop-blur-xl p-1.5 rounded-2xl border border-slate-200 shadow-2xl shadow-slate-900/10">
                {(['all', 'available', 'busy'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      filter === f 
                        ? 'bg-slate-950 text-white shadow-lg' 
                        : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 bg-white/90 backdrop-blur-xl p-1.5 rounded-2xl border border-slate-200 shadow-2xl shadow-slate-900/10">
                {(['light', 'dark', 'satellite'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setMapType(t)}
                    className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                      mapType === t 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={handleRecenter}
                  className="bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-200 shadow-2xl shadow-slate-900/10 text-slate-600 hover:text-blue-600 transition-all group relative"
                  title="Locate Me"
                >
                  <Navigation size={20} />
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Locate Me</span>
                </button>
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-200 shadow-2xl shadow-slate-900/10 text-slate-600 hover:text-blue-600 transition-all"
                >
                  <Maximize2 size={20} />
                </button>
              </div>
            </div>

            {/* Legend Overlay */}
            <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-slate-200/50 min-w-[200px]">
              <div className="flex items-center gap-2 mb-4">
                <Layers size={16} className="text-slate-400" />
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Map Legend</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Available Tanker</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Active Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500 shadow-lg shadow-rose-500/30" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Your Location</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                <Info size={12} />
                Live Sync Active
              </div>
            </div>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-popup .leaflet-popup-content-wrapper {
          padding: 0;
          overflow: hidden;
          border-radius: 2rem;
          box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: auto !important;
        }
        .custom-popup .leaflet-popup-tip-container {
          display: none;
        }
        .leaflet-container {
          background: #f8fafc;
        }
      `}} />
    </div>
  );
};

export default MapComponent;
