<a id="top"></a>

<div align="center">

# 🧭 Wanderlust

### A full-stack travel listing and review platform

Discover unique stays, publish property listings, and share community reviews through a responsive, server-rendered experience.

[![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![EJS](https://img.shields.io/badge/Views-EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)](https://ejs.co/)

[![Passport](https://img.shields.io/badge/Auth-Passport-34E27A?style=flat-square&logo=passport&logoColor=white)](https://www.passportjs.org/)
[![GitHub last commit](https://img.shields.io/github/last-commit/KaiserFury/Full-Stack-project?style=flat-square)](https://github.com/KaiserFury/Full-Stack-project/commits/main)
[![GitHub issues](https://img.shields.io/github/issues/KaiserFury/Full-Stack-project?style=flat-square)](https://github.com/KaiserFury/Full-Stack-project/issues)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](#license)

[Explore the code](https://github.com/KaiserFury/Full-Stack-project) · [Report a bug](https://github.com/KaiserFury/Full-Stack-project/issues) · [Request a feature](https://github.com/KaiserFury/Full-Stack-project/issues)

</div>

> [!IMPORTANT]
> Wanderlust currently supports property discovery, account authentication, listing management, and reviews. Reservations, payments, messaging, wishlists, and other marketplace capabilities described in the roadmap are not implemented yet.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Application Routes](#application-routes)
- [Authentication and Authorization](#authentication-and-authorization)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Seeding](#database-seeding)
- [How to Use Wanderlust](#how-to-use-wanderlust)
- [Validation and Error Handling](#validation-and-error-handling)
- [Current Limitations](#current-limitations)
- [Future Scope and Roadmap](#future-scope-and-roadmap)
- [Latest Trends and Opportunities](#latest-trends-and-opportunities)
- [Contributing](#contributing)
- [License](#license)

## About the Project

Wanderlust is a server-rendered travel listing application built with Node.js, Express, MongoDB, and EJS. Visitors can browse properties and reviews, while authenticated users can create listings, manage their own listings, and write or remove their own reviews.

The project follows an MVC-style structure: routers define endpoints, controllers handle request logic, Mongoose models manage data, and EJS-Mate renders reusable layouts and pages. It is a learning-focused listing platform, not a reservation or payment system.

## Features

- Public listing catalog with images, titles, and INR nightly prices
- Detailed listing pages with owner, location, country, description, and reviews
- Passport Local authentication with session-backed login and logout
- Protected listing creation and review submission
- Owner-only listing editing and deletion
- Author-only review deletion
- Joi validation for listing and review submissions
- Bootstrap client-side form validation and responsive layouts
- Flash messages for success and error feedback
- Cloudinary-backed image storage for uploaded listing images
- Automatic cleanup of referenced reviews when a listing is deleted
- Reusable EJS-Mate layout, navbar, alerts, footer, and error page


## Screenshots

<table>
  <tr>
    <td align="center">
      <img src="./project%20gallery/Listings%20Catalog.jpg" alt="Wanderlust listings catalog" width="100%" />
      <br />
      <sub><strong>Listings catalog</strong></sub>
    </td>
    <td align="center">
      <img src="./project%20gallery/listing%20and%20reviews.jpg" alt="Wanderlust listing details and reviews" width="100%" />
      <br />
      <sub><strong>Listing details and reviews</strong></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="./project%20gallery/new%20listing.jpg" alt="Wanderlust create listing form" width="100%" />
      <br />
      <sub><strong>Create listing</strong></sub>
    </td>
    <td align="center">
      <img src="./project%20gallery/SignUp.jpg" alt="Wanderlust signup form" width="100%" />
      <br />
      <sub><strong>Signup form</strong></sub>
    </td>
  </tr>
</table>

## Architecture

Wanderlust is a modular Express application with separate routing, controller, model, and view layers.

```text
Browser
   │
   ▼
Express app ──► Router ──► Middleware / Joi validation
                              │
                              ▼
                          Controller
                           ├──► Mongoose ──► MongoDB
                           └──► EJS-Mate ──► HTML response
```

| Layer | Responsibility |
| --- | --- |
| `app.js` | Configures MongoDB, sessions, Passport, view locals, routers, errors, and the server |
| `routers/` | Maps URLs to middleware and controller functions |
| `controllers/` | Handles listing, review, and user workflows |
| `middleware.js` | Enforces login, listing ownership, and review authorship |
| `models/` | Defines MongoDB documents and relationships |
| `schema.js` | Validates listing and review request bodies with Joi |
| `cloudConfig.js` | Configures Cloudinary and Multer storage for listing images |
| `views/` | Renders EJS pages, layouts, and shared partials |
| `public/` | Serves CSS and browser-side form validation |

## Tech Stack

| Area | Technology |
| --- | --- |
| Runtime | Node.js, CommonJS |
| Backend | Express `5.2.1` |
| Database | MongoDB with Mongoose `9.7.4` |
| Views | EJS `6.0.1` and EJS-Mate `4.0.0` |
| Authentication | Passport, Passport Local, Passport Local Mongoose |
| Sessions | Express Session and Connect Flash |
| Validation | Joi `18.2.3` and Bootstrap form validation |
| Image uploads | Cloudinary, Multer, and Multer Storage Cloudinary |
| Frontend | Bootstrap `5.3.8`, Font Awesome `6.5.2`, custom CSS, vanilla JavaScript |
| Form methods | Method Override |

## Project Structure

```text
Full-Stack-project/
├── cloudConfig.js
├── app.js
├── middleware.js
├── schema.js
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routers/
│   ├── routesListing.js
│   ├── routesReviews.js
│   └── routesUser.js
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
├── public/
│   ├── css/
│   └── java script/
├── project gallery/       # README screenshots
├── init/
│   ├── data.js
│   └── index.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── package.json
├── package-lock.json
└── README.md
```

## Data Model

```text
User 1 ───── owns ──────── * Listing
User 1 ───── authors ───── * Review
Listing 1 ── references ── * Review
```

| Model | Main fields | Notes |
| --- | --- | --- |
| `User` | `email` plus Passport-managed `username`, `hash`, and `salt` | Email is required but not yet verified or unique |
| `Listing` | `title`, `description`, `image.url`, `image.filename`, `price`, `location`, `country`, `owner`, `reviews` | Stores Cloudinary image details and removes referenced reviews after deletion |
| `Review` | `comment`, `rating`, `createdAt`, `author` | Rating is limited to 1–5 |

## Application Routes

The application renders HTML pages rather than exposing a JSON API.

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/` | Public | Returns `Working` |
| `GET` | `/signup` | Public | Renders the signup form |
| `POST` | `/signup` | Public | Intended to create and log in a user |
| `GET` | `/login` | Public | Renders the login form |
| `POST` | `/login` | Public | Authenticates credentials and redirects to the saved destination or `/listings` |
| `GET` | `/logout` | Public route | Logs out the current session |
| `GET` | `/listings` | Public | Renders all listings |
| `GET` | `/listings/new` | Signed-in user | Renders the listing form |
| `POST` | `/listings` | Signed-in user | Uploads an image and creates a listing owned by the current user |
| `GET` | `/listings/:id` | Public | Renders a listing with owner and review details |
| `GET` | `/listings/:id/edit` | Listing owner | Renders the edit form |
| `PUT` | `/listings/:id` | Listing owner | Validates and updates a listing through method override |
| `GET` | `/listings/:id/delete` | Listing owner | Deletes a listing and its referenced reviews |
| `POST` | `/listings/:id/reviews` | Signed-in user | Validates and creates a review |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Review author | Deletes a review through method override |
| `ALL` | Any unmatched route | Public | Renders the shared not-found error page |

> [!NOTE]
> Listing deletion and logout are currently state-changing `GET` requests. A production revision should use `DELETE`/`POST` plus CSRF protection.

## Authentication and Authorization

- Passport Local checks the submitted username and password.
- Passport Local Mongoose provides username storage, password hashing, authentication helpers, and user serialization.
- Express Session keeps users signed in; the cookie is configured for seven days and is `httpOnly`.
- Guests who request a protected page are redirected to `/login`, then returned to the original URL after successful authentication.
- `isOwner` protects listing changes and `isReviewAuthor` protects review deletion.
- EJS receives the current user through `res.locals.currentLoginStatus` so navigation and action buttons match the session.

The current session secret is hard-coded and sessions use the default in-memory store. Both should be replaced before deployment.

## Getting Started

### Prerequisites

- Git
- Node.js `20.19.0` or newer
- npm
- MongoDB running locally on `127.0.0.1:27017`
- A Cloudinary account

### Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/KaiserFury/Full-Stack-project.git
   cd Full-Stack-project
   ```

2. Install dependencies.

   ```bash
   npm ci
   ```

3. Create a `.env` file with the Cloudinary variables listed below.

4. Start MongoDB.

5. Run the application.

   ```bash
   node app.js
   ```

6. Open `http://localhost:8080/listings`.

There is currently no `start` or `dev` script. The root route only returns `Working`.

### Testing

Automated tests are not implemented. The existing `npm test` command is only a failing placeholder. For a basic syntax check, run:

```bash
node --check app.js
```

Run the same command for any JavaScript file you change.

### Deployment

The current configuration is intended for local development. Before deployment, move secrets and connection settings to environment variables, use a hosted MongoDB database, add a persistent session store, configure secure cookies, and add a production start script.

## Environment Variables

Development mode loads `.env` through Dotenv. Cloudinary reads these variables when configuring image storage:

| Variable | Purpose | Status |
| --- | --- | --- |
| `CLOUD_NAME` | Cloudinary cloud name | Required for uploads |
| `API_KEY` | Cloudinary API key | Required for uploads |
| `API_SECRET` | Cloudinary API secret | Required for uploads |
| `NODE_ENV` | Skips local `.env` loading when set to `production` | Optional |

```env
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

The MongoDB URI, session secret, and port remain hard-coded. `.env` is ignored by Git and must not be committed.

## Database Seeding

`init/data.js` contains 29 sample listings.

> [!CAUTION]
> `node init/index.js` deletes every listing in the configured database before inserting the samples. It also assigns a hard-coded owner ID and does not create that user.

For disposable local data:

1. Create a user and obtain its MongoDB ObjectId.
2. Replace the owner ID in `init/index.js`.
3. Confirm that no listing data needs to be kept.
4. Run `node init/index.js`.
5. Stop the process with <kbd>Ctrl</kbd>+<kbd>C</kbd> if it remains connected after seeding.

## How to Use Wanderlust

1. Start MongoDB and run `node app.js`.
2. Visit `/listings` to browse the catalog.
3. Open a card to view listing details and reviews.
4. Log in with an existing account to create a listing with an uploaded image or write a review.
5. Open a listing you own to edit or delete it.
6. Delete only reviews authored by your account.
7. Use the navbar to log out.

Prices are informational only; the project does not support bookings or payments.

## Validation and Error Handling

| Area | Current behavior |
| --- | --- |
| Listings | Joi requires title, description, location, country, and a non-negative price |
| Reviews | Joi requires a comment and rating from 1 to 5 |
| Browser forms | Bootstrap validation displays client-side feedback |
| Async routes | `wrapAsync` forwards rejected controller promises |
| Missing listing | The show controller flashes an error and returns to `/listings` |
| Unknown route | `ExpressError` sends unmatched routes to the shared error view |
| Listing deletion | Mongoose middleware removes referenced reviews |

Authentication forms do not have server-side Joi validation.

## Current Limitations

| Area | Current limitation |
| --- | --- |
| Configuration | Database URI, session secret, and port are hard-coded |
| Image uploads | Listing validation currently runs before Multer parses the multipart form, so new listing uploads can fail validation |
| Sessions | Uses the development-only in-memory store without `secure` or `sameSite` cookie settings |
| HTTP safety | Listing deletion and logout use `GET`; CSRF protection is not implemented |
| Validation | Authentication input is not validated on the server, and email is not normalized, unique, or verified |
| Missing records | Ownership middleware assumes the listing, review, owner, and author exist |
| Error responses | The error handler renders a page without applying the stored HTTP status code |
| Seed script | Deletes all listings, uses one hard-coded owner, and keeps the database connection open |
| Tooling | No start, development, lint, or working test scripts |
| UI links | Privacy and terms footer links do not have routes |

## Future Scope and Roadmap

The near-term roadmap focuses on improvements that fit the current Express and EJS application.

### Stability and security

- [ ] Move the MongoDB URI, session secret, and port to environment variables
- [ ] Add server-side validation for signup and login
- [ ] Use a persistent session store and secure cookie settings
- [ ] Replace state-changing `GET` routes and add CSRF protection
- [ ] Add defensive checks for missing listings, reviews, owners, and authors
- [ ] Return correct HTTP status codes from the error handler

### User experience

- [ ] Add email verification and password reset
- [ ] Add a basic profile page with editable account details
- [ ] Add pagination and simple search by title, location, or country
- [ ] Show an average rating on each listing
- [ ] Improve mobile spacing, form labels, empty states, and accessibility

### Development and deployment

- [ ] Add unit and route tests for validation, authentication, and authorization
- [ ] Add `start` and `dev` scripts plus linting and formatting
- [ ] Add Docker and Docker Compose for the app and local MongoDB
- [ ] Configure a production database, session store, logging, and deployment workflow

Bookings, payments, real-time chat, AI recommendations, and other marketplace-scale features are outside the current near-term scope.

## Latest Trends and Opportunities

Practical improvements that fit this codebase:

| Practice | Application in Wanderlust |
| --- | --- |
| Progressive enhancement | Keep EJS rendering as the baseline and add JavaScript only where it improves forms or navigation |
| Responsive image delivery | Store uploads in a managed service and serve appropriately sized WebP or AVIF images |
| Accessible responsive UI | Improve keyboard navigation, focus states, labels, contrast, and small-screen layouts |
| Automated quality checks | Run syntax checks and tests in CI after a test suite is added |
| Reproducible development | Use Docker Compose to provide consistent Node.js and MongoDB environments |

These changes improve the existing application without requiring a frontend rewrite or a much larger product scope.

## Contributing

1. Fork the repository.
2. Create a focused branch.
3. Keep changes small and related to one issue.
4. Verify affected routes and run available checks.
5. Open a pull request with a clear description and screenshots for UI changes.

Do not commit credentials, local database files, or generated dependencies.

## License

`package.json` declares the project under the ISC License. A standalone `LICENSE` file has not been added yet.

---

<div align="center">
  <sub>Built with Node.js, Express, MongoDB, EJS, and a love of discovering new places.</sub>
  <br />
  <a href="#top">Back to top</a>
</div>
