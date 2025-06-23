import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Truck, Bike, Car, Phone, MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import toast, { Toaster } from 'react-hot-toast';

const dummyTransporters = [
  { id: 1, name: "Suman's Truck", vehicleType: 'truck', contact: '7001002001', position: [22.5726, 88.3639] },
  { id: 2, name: "Rina's Bike", vehicleType: 'bike', contact: '8005006002', position: [22.5800, 88.3700] },
  { id: 3, name: "Raj's Car", vehicleType: 'car', contact: '9876543210', position: [22.5626, 88.3439] },
  { id: 4, name: 'Amit Van', vehicleType: 'truck', contact: '9002003003', position: [22.5950, 88.3900] },
  { id: 5, name: 'Meena’s Scooty', vehicleType: 'bike', contact: '9831001122', position: [22.5640, 88.3745] },
  { id: 6, name: 'Niraj Sedan', vehicleType: 'car', contact: '9123456789', position: [22.5850, 88.3455] },
];

const VehicleFilter = ['all', 'truck', 'bike', 'car'];
const getCustomIcon = (iconHTML, bgColor = 'bg-gray-800') => {
  return L.divIcon({
    className: `${bgColor} text-white text-sm px-2 py-1 rounded shadow`,
    html: iconHTML,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

const getLucideIconHTML = (type) => {
  switch (type) {
    case 'truck':
      return `<svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-truck" width="20" height="20" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 20 13 16 13 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/></svg>`;
    case 'bike':
      return `<svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-bike" width="20" height="20" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/><path d="M5.5 18.5l3-8.5 4 4L10 3l5 4 1.5 6.5"/></svg>`;
    case 'car':
      return `<svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-car" width="20" height="20" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18l-2-5H5l-2 5z"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`;
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-map-pin" width="20" height="20" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c-4.8-4.6-8-8-8-11a8 8 0 1 1 16 0c0 3-3.2 6.4-8 11z"/><circle cx="12" cy="10" r="3"/></svg>`;
  }
};

const Logistics = () => {
  const [position, setPosition] = useState([22.5726, 88.3639]);
  const [destinationInput, setDestinationInput] = useState('');
  const [currentLocationAddress, setCurrentLocationAddress] = useState('');
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        // Reverse geocode current position
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
          .then(res => res.json())
          .then(data => setCurrentLocationAddress(data.display_name))
          .catch(() => toast.error('Failed to fetch address'));
      },
      () => toast.error('Location access denied. Using default location.')
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const filteredTransporters = dummyTransporters.filter(
    t => selectedVehicleType === 'all' || t.vehicleType === selectedVehicleType
  );

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'truck': return <Truck className="inline w-5 h-5" />;
      case 'bike': return <Bike className="inline w-5 h-5" />;
      case 'car': return <Car className="inline w-5 h-5" />;
      default: return <MapPin className="inline w-5 h-5" />;
    }
  };

  const handleBooking = (transporter) => {
    setSelectedTransporter(transporter);
    setShowBookingForm(true);
  };

  const handleConfirmBooking = () => {
    if (!destinationInput) {
      toast.error('Please enter a destination!');
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destinationInput}, India`)
      .then(res => res.json())
      .then(data => {
        if (!data.length) {
          toast.error('Destination not found!');
          return;
        }

        const destCoords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setDestinationCoords(destCoords);

        fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
          method: 'POST',
          headers: {
            'Authorization': '5b3ce3597851110001cf6248a424f51f6bc749049f267a842d9379c1', // replace with your key
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coordinates: [[position[1], position[0]], [destCoords[1], destCoords[0]]],
          }),
        })
          .then(res => res.json())
          .then(data => {
            const coords = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            setRouteCoords(coords);
            setShowBookingForm(false);
            toast.success('Booking confirmed! Get in touch via call.');
          })
          .catch(() => toast.error('Route generation failed!'));
      });
  };

  const ChangeMapView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(coords);
    }, [coords]);
    return null;
  };

  return (
    <div className="p-6">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4">🚚 Logistics & Transport Booking</h1>

      <div className="mb-4 flex flex-wrap gap-3">
        {VehicleFilter.map(type => (
          <button key={type}
            className={`px-4 py-2 border rounded-md ${selectedVehicleType === type ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => setSelectedVehicleType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {filteredTransporters.map(transporter => (
          <div key={transporter.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {getVehicleIcon(transporter.vehicleType)} {transporter.name}
            </h2>
            <p><strong><Phone className="inline w-4 h-4 mr-1" />:</strong> {transporter.contact}</p>
            <p><strong>Vehicle:</strong> {transporter.vehicleType}</p>
            <p><strong>Location:</strong> Lat {transporter.position[0].toFixed(3)}, Lon {transporter.position[1].toFixed(3)}</p>
            <button onClick={() => handleBooking(transporter)}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md">
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-md w-[90%] md:w-[400px]">
            <h2 className="text-xl font-bold mb-4">Enter Destination</h2>
            <p className="text-sm mb-2"><strong>Your Current Location:</strong> {currentLocationAddress}</p>
            <div className="mb-4">
              <input
                type="text"
               
                
                placeholder="Enter product to be transported (e.g., Wheat Straw)"
                className="border px-4 py-2 w-full rounded-md mb-4"
              />
              <input
                type="text"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                placeholder="Enter destination (e.g., Howrah Station)"
                className="border px-4 py-2 w-full rounded-md mb-4"
              />
              <button 
                onClick={() => setDestinationInput(currentLocationAddress)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md w-full"
              >
                Use Current Location
              </button>
            </div>
            <div className="flex justify-between">
              <button onClick={handleConfirmBooking} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Confirm
              </button>
              <button onClick={() => setShowBookingForm(false)} className="text-red-500">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="h-[500px] w-full rounded overflow-hidden">
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ChangeMapView coords={position} />

         {/* User Location Marker */}
<Marker
  position={position}
  icon={getCustomIcon('<b>You</b>', 'bg-red-600')}
>
  <Popup>Your Live Location</Popup>
</Marker>

{/* Transporters with Lucide icons */}
{filteredTransporters.map((t) => (
  <Marker
    key={t.id}
    position={t.position}
    icon={getCustomIcon(getLucideIconHTML(t.vehicleType))}
  >
    <Popup>{t.name} ({t.vehicleType})</Popup>
  </Marker>
))}

{/* Destination marker with dark icon */}
{destinationCoords && (
  <Marker
    position={destinationCoords}
    icon={getCustomIcon(getLucideIconHTML('default'))}
  >
    <Popup>Destination</Popup>
  </Marker>
)}


          {routeCoords.length > 0 && (
            <Polyline positions={routeCoords} color="blue" />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Logistics;
