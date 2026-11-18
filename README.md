# Basera — Student Accommodation Discovery (Frontend Prototype)

Basera is a React + Vite frontend prototype for discovering student accommodation such as PGs, flats, hostels and independent rooms.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```

## Included in this enhanced prototype

- **25 sample property listings** across Muradnagar, Modinagar, Raj Nagar, Raj Nagar Extension, Vaishali, Indirapuram and Crossings Republik.
- Search and filters for area/property type, rent, room type, rating, food, Wi-Fi, AC and reviewed listing status.
- Favourites and up-to-four-property comparison, saved in browser `localStorage`.
- **TrueCost calculator:** editable monthly estimates for food, electricity, maintenance, transport and internet, added to rent.
- **Listing review / trust information:** demo verification checklist and clear caveat that reviewed status is not a safety guarantee.
- **Student reviews:** users can submit a rating and review on a property page; these are saved in browser `localStorage` for that browser only.
- **Availability labels:** illustrative statuses only; they are not connected to property owners or real-time inventory.
- **Safety information:** pre-visit checklist, emergency number 112, and property-level sample safety details.
- **Report suspicious listing:** report form saved locally in the browser; it does not notify an admin or moderation team.
- Owner listing form demonstration.

## Important project scope note

This is still a **Semester 1 frontend prototype**. Property data, verification labels, availability, initial ratings and safety attributes are sample/demo data and must not be presented as live verified facts. Reviews, favourites and reports are stored only in the current browser using `localStorage`. There is no authentication, backend API, MongoDB database, admin moderation, real-time availability or owner verification yet. These are suitable Semester 2 extensions using Node.js, Express and MongoDB.

## Main structure

- `src/App.jsx` — pages, routing, state and interactions
- `src/data/properties.js` — 25 sample property records
- `src/style.css` — responsive styling and glassmorphism UI
- `src/main.jsx` — React entry point
