'use client';

import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { getSekolah, Sekolah } from '@/lib/api';
import { School, MapPin, Users, FlaskConical, X } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 160px)',
  borderRadius: '1.5rem',
};

const center = {
  lat: 1.0367, // Approximate center of Buol
  lng: 121.3917
};

export default function PetaSekolah() {
  const [sekolah, setSekolah] = useState<Sekolah[]>([]);
  const [selected, setSelected] = useState<Sekolah | null>(null);
  const [loading, setLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  useEffect(() => {
    getSekolah().then(data => {
      setSekolah(data);
      setLoading(false);
    });
  }, []);

  if (!isLoaded || loading) {
    return (
      <div className="h-[calc(100vh-160px)] w-full bg-slate-100 animate-pulse rounded-3xl flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-bounce" />
          <p className="text-slate-500 font-medium">Memuat Peta GIS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Pemetaan GIS Sekolah</h1>
          <p className="text-slate-500 mt-1">Sebaran sekolah menengah pertama di Kabupaten Buol.</p>
        </div>
      </div>

      <div className="relative shadow-2xl shadow-blue-100 rounded-3xl overflow-hidden border border-white">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={{
            styles: [
              {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#444444" }]
              },
              {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{ "color": "#f2f2f2" }]
              },
              {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{ "visibility": "off" }]
              },
              {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
              },
              {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{ "visibility": "simplified" }]
              },
              {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{ "visibility": "off" }]
              },
              {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{ "visibility": "off" }]
              },
              {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{ "color": "#4f595d" }, { "visibility": "on" }]
              },
              {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#e3f2fd" }]
              }
            ]
          }}
        >
          {sekolah.map((item) => (
            <Marker
              key={item.id}
              position={{ 
                lat: parseFloat(item.latitude), 
                lng: parseFloat(item.longitude) 
              }}
              onClick={() => setSelected(item)}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              }}
            />
          ))}

          {selected && (
            <InfoWindow
              position={{ 
                lat: parseFloat(selected.latitude), 
                lng: parseFloat(selected.longitude) 
              }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="p-2 min-w-[240px]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <School className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">{selected.nama_sekolah}</h4>
                    <p className="text-[10px] text-slate-500 font-medium uppercase">{selected.kecamatan}</p>
                  </div>
                </div>
                
                <div className="space-y-2 border-t border-slate-100 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1"><Users className="w-3 h-3" /> Guru Matematika</span>
                    <span className="font-bold text-slate-900">{selected.jumlah_guru}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1"><FlaskConical className="w-3 h-3" /> Lab Matematika</span>
                    <span className={`font-bold ${selected.fasilitas_lab === 'Ada' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {selected.fasilitas_lab === 'Ada' ? 'Tersedia' : 'Tidak Ada'}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 italic leading-tight">{selected.alamat}</p>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        {/* Legend / Overlay */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-2xl border border-white shadow-xl max-w-xs hidden md:block">
          <h5 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">Statistik Wilayah</h5>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-medium">Total Sekolah Terdata</span>
              <span className="text-xs font-bold text-blue-600">{sekolah.length}</span>
            </div>
            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-full bg-blue-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
