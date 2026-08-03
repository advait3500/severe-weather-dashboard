import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

const CITY_COORDS = {
  "Dallas": [32.7767, -96.7970],
  "Fort Worth": [32.7555, -97.3308],
  "Houston": [29.7604, -95.3698],
  "Austin": [30.2672, -97.7431],
  "San Antonio": [29.4241, -98.4936],
  "El Paso": [31.7619, -106.4850],
  "McKinney": [33.1972, -96.6398],
  "Plano": [33.0198, -96.6989],
  "Corpus Christi": [27.8006, -97.3964],
  "Lubbock": [33.5779, -101.8552],
};

function severityClass(severity) {
  if (severity === "Extreme") return "extreme";
  if (severity === "Severe") return "severe";
  return "";
}

function App() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/alerts?state=TX")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data.alerts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="App"><h2>Loading alerts...</h2></div>;
  if (error) return <div className="App"><h2>Error: {error}</h2></div>;

  return (
    <div className="App">
      <h1>Severe Weather Alert Dashboard</h1>
      <p className="subtitle">{alerts.length} active alerts for major Texas cities</p>

      <MapContainer center={[31.5, -99.5]} zoom={6} style={{ height: "400px", borderRadius: "8px", marginBottom: "24px" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
        />
        {alerts.flatMap((alert) =>
          alert.cities
            .filter((city) => CITY_COORDS[city])
            .map((city) => (
              <CircleMarker
                key={alert.id + city}
                center={CITY_COORDS[city]}
                radius={10}
                pathOptions={{ color: "#f5a623", fillColor: "#f5a623", fillOpacity: 0.6 }}
              >
                <Popup>
                  <strong>{alert.event}</strong><br />
                  {city} - {alert.severity}
                </Popup>
              </CircleMarker>
            ))
        )}
      </MapContainer>

      <div className="alert-list">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert-card ${severityClass(alert.severity)}`}>
            <h3>{alert.event}</h3>
            <span className="severity-badge">{alert.severity}</span>
            <p><strong>Cities:</strong> {alert.cities.join(", ")}</p>
            <p>{alert.headline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

