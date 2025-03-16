# TravelTrucks Camper Rental App

> This project is a front-end web application for "TravelTrucks".
> Live demo [travel-trucks-pi-flax.vercel.app].

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [BackEnd API](#backend-api)
- [Features](#features)
- [Functionality](#functionality)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Contact](#contact)

## General Information

- This project is a front-end web application for "TravelTrucks" - a camper rental company.
- The application allows users to browse available campers, filter them based on various criteria, view detailed information about individual campers, add campers to their favorites, and submit booking requests.
- This project serves two main purposes:
  1. Practical Skill Development:
     The primary motivation was to gain hands-on experience in building a real-world web application using React, Redux, Tailwind, Axios and Redux Persist.
  2. Portfolio Building:
     This project serves as a portfolio piece demonstrating proficiency in front-end development skills.
- Why did you undertake it?

## Technologies Used

- React: JavaScript library for building user interfaces.
- Vite: Fast build tool for modern web development.
  Redux: State management library for predictable state updates.
- React Router: Library for handling navigation and routing.
- Axios: HTTP client for making API requests.
- Tailwind CSS: Utility-first CSS framework for rapid UI development.

## BackEnd API

The application uses a mock API for camper data: [https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers]

## Features

Features:

- Home Page:
  Features a prominent banner with a call to action to view available campers.
- Catalog Page:
  Displays a list of available campers.
  Implements filtering based on location, body type, and other criteria (AC, kitchen, etc.) - backend filtering.
  Allows users to add campers to their favorites.
  "Load More" button for paginated loading of campers.
- Camper Details Page:
  Displays detailed information about a selected camper, including:
  Image gallery.
  User reviews (5-star rating).
  Comprehensive description using the following properties : transmission, engine, AC, bathroom, kitchen, TV, radio, refrigerator, microwave, gas, water, form, length, width, height, tank, consumption.
  Booking form.
- Routing:
  /: Home page.
  /catalog: Catalog page.
  /catalog/:id: Camper details page.
- State Management (Redux):
  Global state for storing:
  List of campers.
  Filter criteria.
  List of favorite campers (persisted across page reloads).

## Functionality:

- "View Now" button on the home page navigates to the catalog page.
- Filtering is performed on the backend. The front-end sends the filter criteria to the API. Previous search results are cleared before new results are displayed.
- Favorite campers are stored and persist across page reloads.
- "Show More" button on camper cards opens the camper details page in a new tab.
- "Load More" button loads additional camper listings based on applied filters.
- Booking form submission displays a success notification

## Project Status

Project is: _in progress_

## Room for Improvement

Room for improvement:

- Add animation
- Add /favourites: route with list of favourite Campers
- Implement user authentication.

## Contact

Created by Iryna Liskevych [https://www.linkedin.com/in/iryna-liskevych/] - feel free to contact me!
