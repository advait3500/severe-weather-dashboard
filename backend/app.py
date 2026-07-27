from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

NWS_BASE = "https://api.weather.gov"

# Major Texas cities and their counties (expand this list as needed)
MAJOR_CITIES = {
    "Dallas": "Dallas",
    "Fort Worth": "Tarrant",
    "Houston": "Harris",
    "Austin": "Travis",
    "San Antonio": "Bexar",
    "El Paso": "El Paso",
    "McKinney": "Collin",
    "Plano": "Collin",
    "Corpus Christi": "Nueces",
    "Lubbock": "Lubbock",
}

@app.route("/api/alerts")
def get_alerts():
    state = request.args.get("state", "TX")
    resp = requests.get(f"{NWS_BASE}/alerts/active", params={"area": state},
                         headers={"User-Agent": "severe-weather-dashboard (your_email@example.com)"})
    resp.raise_for_status()
    raw_data = resp.json()

    simple_alerts = []
    for feature in raw_data.get("features", []):
        props = feature.get("properties", {})
        area = props.get("areaDesc", "")

        # Check if any major city's county is mentioned in this alert's area
        matched_cities = [city for city, county in MAJOR_CITIES.items() if county in area]

        if matched_cities:
            simple_alerts.append({
                "id": props.get("id"),
                "event": props.get("event"),
                "severity": props.get("severity"),
                "urgency": props.get("urgency"),
                "area": area,
                "cities": matched_cities,
                "headline": props.get("headline"),
                "effective": props.get("effective"),
                "expires": props.get("expires"),
                "geometry": feature.get("geometry")
            })

    return jsonify({
        "count": len(simple_alerts),
        "alerts": simple_alerts
    })

if __name__ == "__main__":
    app.run(debug=True, port=5001)
