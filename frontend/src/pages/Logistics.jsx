import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Truck, Bike, Car } from 'lucide-react';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const dummyTransporters = [
  { id: 1, name: 'John\'s Truck', vehicleType: 'truck', contact: '123-456-7890', position: [51.515, -0.09] },
  { id: 2, name: 'Alice\'s Bike', vehicleType: 'bike', contact: '987-654-3210', position: [51.525, -0.10] },
  { id: 3, name: 'Bob\'s Car', vehicleType: 'car', contact: '456-789-1230', position: [51.505, -0.12] },
];

const Logistics = () => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [mapInstance, setMapInstance] = useState(null);

  const destination = [51.515, -0.08];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
          setLoading(false);
        },
        () => {
          alert("Could not fetch your location.");
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  const filteredTransporters = dummyTransporters.filter(
    (transporter) => selectedVehicleType === 'all' || transporter.vehicleType === selectedVehicleType
  );

  const handleBooking = (transporter) => {
    setSelectedTransporter(transporter);
    setBookingDetails({
      from: position,
      to: destination,
      vehicle: transporter.vehicleType,
      transporterName: transporter.name,
      contact: transporter.contact,
    });
  };

  const AddRoute = () => {
    const map = useMap();

    useEffect(() => {
      if (map) {
        const routeControl = L.Routing.control({
          waypoints: [
            L.latLng(position[0], position[1]),
            L.latLng(destination[0], destination[1]),
          ],
          routeWhileDragging: true,
        }).addTo(map);

        setMapInstance(map); // Store map instance

        return () => {
          if (mapInstance) {
            mapInstance.eachLayer((layer) => {
              if (layer instanceof L.Routing.Control) {
                mapInstance.removeControl(layer); // Properly remove the routing control
              }
            });
          }
        };
      }
    }, [map, position, destination]);

    return null;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Logistics & Transport Booking</h1>

      <div className="mb-4">
        <button onClick={() => setSelectedVehicleType('all')} className="px-4 py-2 border rounded-md">All Vehicles</button>
        <button onClick={() => setSelectedVehicleType('truck')} className="ml-2 px-4 py-2 border rounded-md">Truck <Truck className="inline-block ml-2" /></button>
        <button onClick={() => setSelectedVehicleType('bike')} className="ml-2 px-4 py-2 border rounded-md">Bike <Bike className="inline-block ml-2" /></button>
        <button onClick={() => setSelectedVehicleType('car')} className="ml-2 px-4 py-2 border rounded-md">Car <Car className="inline-block ml-2" /></button>
      </div>

      {loading && <p>Loading transporters...</p>}

      {bookingDetails && (
        <div className="bg-blue-100 p-4 rounded-md mb-6">
          <h2 className="font-semibold text-xl mb-2">Booking Confirmed</h2>
          <p><strong>From:</strong> Current Location</p>
          <p><strong>To:</strong> Destination</p>
          <p><strong>Transporter:</strong> {bookingDetails.transporterName}</p>
          <p><strong>Vehicle Type:</strong> {bookingDetails.vehicle}</p>
          <p><strong>Contact:</strong> {bookingDetails.contact}</p>
        </div>
      )}

      <div className="relative h-96 w-full mb-4">
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} whenCreated={setMapInstance}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          <Marker position={position} icon={L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/689/689177.png', iconSize: [32, 32] })}>
            <Popup>Your Current Location</Popup>
          </Marker>

          <Marker position={destination} icon={L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/892/892741.png', iconSize: [32, 32] })}>
            <Popup>Destination</Popup>
          </Marker>

          <AddRoute />

          {filteredTransporters.map((transporter) => (
            <Marker
              key={transporter.id}
              position={transporter.position}
              icon={transporter.vehicleType === 'truck' ? L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/1576/1576701.png', iconSize: [32, 32] })
                : transporter.vehicleType === 'bike' ? L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/3062/3062650.png', iconSize: [32, 32] })
                  : L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/3423/3423004.png', iconSize: [32, 32] })}>
              <Popup>
                <div>
                  <h3 className="font-semibold">{transporter.name}</h3>
                  <p>Contact: {transporter.contact}</p>
                  <p>Vehicle Type: {transporter.vehicleType}</p>
                  <button
                    onClick={() => handleBooking(transporter)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Book Transport
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Logistics;
