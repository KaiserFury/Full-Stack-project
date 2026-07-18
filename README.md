# Wanderlust

Wanderlust is a simple full-stack listing application built with Node.js, Express, MongoDB, and EJS. It allows users to view, create, edit, and delete travel listings through a clean web interface.

## Project Overview

This project is a beginner-friendly full-stack web app that demonstrates core CRUD operations and template-based rendering. It is designed to help learn how to connect a Node.js server with a MongoDB database and render dynamic pages using EJS.

## Features

- View all listings on the homepage
- Open individual listing details
- Create new listings using a form
- Edit existing listings
- Delete listings
- Responsive UI with Bootstrap styling
- Reusable layout using EJS-Mate
- Static asset serving for CSS and frontend files

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- EJS-Mate
- Bootstrap
- Font Awesome
- Method Override

## Project Structure

```bash
major project/
├── app.js
├── package.json
├── init/
│   ├── data.js
│   └── index.js
├── models/
│   └── listing.js
├── public/
│   └── css/
│       └── style.css
└── views/
    ├── includes/
    │   └── navbar.ejs
    ├── layouts/
    │   └── boilerplate.ejs
    └── listings/
        ├── edit.ejs
        ├── index.ejs
        ├── new.ejs
        └── show.ejs
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Make sure MongoDB is running locally
4. Start the server:

```bash
node app.js
```

5. Open your browser and visit:

```bash
http://localhost:8080
```

## Usage

- Visit the homepage to see all listings
- Use the "Add new Listings" link to create a new listing
- Click on any listing to view its details
- Use the edit option to update a listing
- Use the delete option to remove a listing

## Database

The app connects to a local MongoDB database named `WanderLust`.

## Notes

This project is currently in an early learning stage and focuses on understanding the fundamentals of backend development, database integration, and rendering dynamic pages.

## Future Improvements

Possible future enhancements include:

- User authentication
- Image upload support
- Search and filtering
- Better validation and error handling
- Improved UI and animations
