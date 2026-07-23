# Wanderlust

Wanderlust is a full-stack listing application built with Node.js, Express, MongoDB, and EJS. It allows users to manage travel listings with create, read, update, delete, and review functionality through a Bootstrap-based interface.

## Project Overview

This app demonstrates a modern Express.js workflow with:
- server-side rendering using EJS and EJS-Mate layouts
- MongoDB models with Mongoose
- request validation using Joi
- method override for PUT/DELETE support in HTML forms
- centralized async error handling and custom 404 pages
- frontend form validation using Bootstrap

## Features

- View all listings on `/listings`
- Open individual listing details
- Create a new listing with validation
- Edit existing listings
- Delete listings
- Add reviews to listings
- Delete reviews from the listing details page
- Custom error page for invalid routes and validation failures
- Responsive UI with Bootstrap and Font Awesome

## Current Dependencies

- `express`
- `mongoose`
- `ejs`
- `ejs-mate`
- `method-override`
- `joi`

## Project Structure

```bash
major project/
├── app.js
├── package.json
├── schema.js
├── README.md
├── models/
│   ├── listing.js
│   └── review.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── java script/
│       └── script.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
└── views/
    ├── includes/
    │   ├── error.ejs
    │   ├── footer.ejs
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

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Make sure MongoDB is running locally.
4. Start the app:

```bash
node app.js
```

5. Open the app in your browser at:

```bash
http://localhost:8080/listings
```

## Usage

- Visit `/listings` to browse all listings.
- Click `Add new Listings` to create a new listing.
- Click a listing card to view details and add reviews.
- Use the `Edit details` button to update a listing.
- Use the `Delete listing` button to remove a listing.
- Use the review section to submit ratings/comments and delete reviews.

## Notes

- The root route `/` currently returns a simple "Working" response. The primary user experience begins at `/listings`.
- Static assets are served from the `public` directory.
- Form validation is implemented both on the frontend and server-side.

## Future Improvements

Possible next steps include:

- user authentication and authorization
- file upload support for listing images
- filter/search listings by location or price
- better review author tracking
- more robust error messages and UI polishing
