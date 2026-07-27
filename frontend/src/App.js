import React, { useEffect, useState } from "react";
import "./App.css";

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
      <p>{alerts.length} active alerts for major Texas cities</p>
      <div className="alert-list">
        {alerts.map((alert) => (
          <div key={alert.id} className="alert-card">
            <h3>{alert.event}</h3>
            <p><strong>Cities:</strong> {alert.cities.join(", ")}</p>
            <p><strong>Severity:</strong> {alert.severity}</p>
            <p>{alert.headline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
