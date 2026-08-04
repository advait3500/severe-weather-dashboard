# Severe Weather Alert Dashboard

A full-stack web application that displays live severe weather alerts from the National Weather Service (NWS) for major Texas cities, with an interactive map view.

## Overview

This project pulls real-time alert data from the NWS public API, filters it down to alerts affecting major Texas metro areas, and displays it as both an interactive map and a styled list view. Built as an extension of an earlier severe weather alert optimization project, this version turns that static analysis into a live, deployed application.

## Features

- Live data pulled from the National Weather Service API (no API key required)
- Filters raw county-level alert data down to major city relevance
- Interactive map with color-coded severity markers
- Clean, dark-themed dashboard UI showing alert details

## Tech Stack

**Backend:** Python, Flask, Flask-CORS, Requests
**Frontend:** React, Leaflet (react-leaflet) for mapping
**Data Source:** National Weather Service API (api.weather.gov)

## Architecture

- backend/ — Flask API that fetches and simplifies NWS alert data
- frontend/ — React app that displays the data as a map and card list

## Running Locally

Backend:
cd backend
source venv/bin/activate
pip install -r requirements.txt
python app.py

Frontend:
cd frontend
npm install
npm start

The frontend runs on localhost:3000 and expects the backend on localhost:5001.

## What's Next

- User subscriptions to specific counties/cities with saved preferences
- Automated notifications for new alerts in subscribed areas
- Expanded city/county coverage beyond the initial major-city list

## Background

This project builds on an earlier Excel Solver-based optimization model that maximized severe weather alert coverage across five U.S. cities. This version reimplements that concept as a live, deployed system pulling real weather data instead of static inputs.
