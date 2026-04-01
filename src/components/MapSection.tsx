import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { locations } from '../data/siteData';

export default function MapSection() {
  return (
    <section className="section-padding bg-warm">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="section-title">Find Us</h2>
        <p className="text-gray-600 mb-10">Visit our stores and wellness centers around the world.</p>
        <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
          <MapContainer center={[10, 20]} zoom={2} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc, i) => (
              <Marker key={i} position={[loc.lat, loc.lng]}>
                <Popup>{loc.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
