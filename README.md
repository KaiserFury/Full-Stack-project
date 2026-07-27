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

Wanderlust is a modular, full-stack Node.js application for publishing and discovering travel-property listings. Visitors can browse destinations and read reviews without an account. Registered users can create listings, manage only the listings they own, post ratings and comments, and remove only their own reviews.

The application uses Express and EJS-Mate to render HTML on the server, Mongoose to model data in MongoDB, Passport Local for session-based authentication, Joi for server-side request validation, and Bootstrap for a responsive interface. Its current scope is a listing-and-review platform rather than a booking engine.

### What makes it useful

| Capability | Implementation |
| --- | --- |
| Public discovery | Responsive card grid with listing images, titles, and INR nightly prices |
| Detailed listings | Property description, owner, price, location, country, and community reviews |
| Account access | Username/password signup, login, logout, sessions, and flash feedback |
| Protected content | Authentication is required before creating listings or reviews |
| Ownership rules | Only a listing owner can edit or delete it; only a review author can delete their review |
| Reliable listing/review input | Joi validation on the server plus Bootstrap validation feedback in the browser |
| Data cleanup | Deleting a listing also removes the review documents referenced by it |

## Features

- Browse all travel listings without signing in.
- Open a detailed page for each property and see its owner and reviews.
- Register with an email address, username, and password.
- Log in with Passport Local and return to the originally requested protected page.
- Create listings with a title, description, image URL, nightly price, location, and country.
- Fall back to a default image when a listing image is left empty.
- Edit or delete a listing only when signed in as its owner.
- Add a 1–5 rating and comment to a listing while authenticated.
- Delete a review only when signed in as its author.
- Show success and error feedback across redirects with flash messages.
- Render shared navigation, alerts, error content, and footer elements through EJS-Mate layouts.
- Forward rejected asynchronous handlers to a centralized error view.
- Load an optional sample catalog of destinations for local development.

## Screenshots

<!-- Replace these placeholders with real captures in docs/screenshots/ when the UI is ready for release. -->

<table>
  <tr>
    <td align="center">
      <img src="./project gallery/Listings Catalog.jpg" alt="Listings catalog screenshot placeholder" width="100%" />
      <br />
      <sub><strong>Listings catalog</sub>
    </td>
    <td align="center">
      <img src="./project gallery/listing and reviews.jpg" alt="Listing detail screenshot placeholder" width="100%" />
      <br />
      <sub><strong>Listing details</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="./project gallery/new listing.jpg" alt="Create listing screenshot placeholder" width="100%" />
      <br />
      <sub><strong>Create listing</sub>
    </td>
    <td align="center">
      <img src="./project gallery/SignUp.jpg" alt="Authentication screenshot placeholder" width="100%" />
      <br />
      <sub><strong>Authentication</sub>
    </td>
  </tr>
</table>

## Architecture

Wanderlust is a server-rendered modular monolith. Request handlers live directly inside feature routers; the project does not currently have a separate controller or service layer.

```text
Browser ──HTTP/forms──► Express application ──► Feature router
                                              ├── Sessions / Passport / Flash
                                              ├── Auth and ownership middleware
                                              ├── Joi request validation
                                              ├── Mongoose ◄──► MongoDB
                                              └── res.render(...)
                                                        │
                                                        ▼
Browser ◄──rendered HTML── EJS-Mate layout and templates
```

| Layer | Responsibility |
| --- | --- |
| Application bootstrap | Connects to MongoDB, configures Express/EJS, sessions, Passport, shared locals, routers, errors, and the HTTP server |
| Routers | Define user, listing, and nested review endpoints with inline request handlers |
| Middleware | Require login, preserve return URLs, and enforce listing-owner/review-author permissions |
| Models | Persist users, listings, and reviews and define references between them |
| Validation | Check listing and review payloads with Joi before database writes |
| Views | Render the layout, shared partials, forms, listing pages, and authentication pages |
| Public assets | Provide custom CSS and browser-side Bootstrap form validation |

## Tech Stack

| Area | Technology | Role |
| --- | --- | --- |
| Runtime | Node.js + CommonJS | Server-side JavaScript runtime and module system |
| Web framework | Express `5.2.1` | Routing, middleware, static assets, and HTTP handling |
| Database | MongoDB | Document storage for users, listings, and reviews |
| ODM | Mongoose `9.7.4` | Schemas, relationships, queries, and lifecycle middleware |
| Templates | EJS `6.0.1` + EJS-Mate `4.0.0` | Server-side views, layouts, and reusable partials |
| Authentication | Passport `0.7.0`, Passport Local, Passport Local Mongoose | Credential authentication, password hashing, sessions, and user serialization |
| Session feedback | Express Session `1.19.0` + Connect Flash `0.1.1` | Login persistence and redirect-safe messages |
| Validation | Joi `18.2.3` | Server-side listing and review validation |
| HTTP forms | Method Override `3.0.0` | Enables `PUT` and `DELETE` semantics from HTML forms |
| UI | Bootstrap `5.3.8`, Font Awesome `6.5.2`, custom CSS | Responsive layout, controls, icons, and styling |
| Browser JavaScript | Vanilla JavaScript | Activates Bootstrap form-validation states |

## Project Structure

```text
Full-Stack-project/
├── app.js                         # Express bootstrap, DB, sessions, Passport, routes
├── middleware.js                  # Login and ownership authorization
├── schema.js                      # Joi request-validation schemas
├── package.json                   # Project metadata and dependencies
├── package-lock.json              # Reproducible dependency graph
├── init/
│   ├── index.js                   # Destructive MongoDB seed runner
│   └── data.js                    # Sample destination listings
├── models/
│   ├── listing.js                 # Listing schema and review cascade hook
│   ├── review.js                  # Rating and comment schema
│   └── user.js                    # Passport-enabled user schema
├── routers/
│   ├── routesListing.js           # Listing CRUD routes
│   ├── routesReviews.js           # Nested review routes
│   └── routesUser.js              # Signup, login, and logout routes
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs        # Shared document shell
│   ├── includes/
│   │   ├── alert.ejs              # Flash-message presentation
│   │   ├── error.ejs              # Shared error presentation
│   │   ├── footer.ejs             # Shared footer
│   │   └── navbar.ejs             # Authentication-aware navigation
│   ├── listings/
│   │   ├── index.ejs              # Listing catalog
│   │   ├── show.ejs               # Details and reviews
│   │   ├── new.ejs                # Listing creation form
│   │   └── edit.ejs               # Listing editing form
│   └── users/
│       ├── signup.ejs             # Registration form
│       └── login.ejs              # Login form
├── public/
│   ├── css/
│   │   └── style.css              # Application styling
│   └── java script/
│       └── script.js              # Client-side form validation
├── utils/
│   ├── ExpressError.js            # Custom application error
│   └── wrapAsync.js               # Async route error adapter
├── .gitignore
└── README.md
```

## Data Model

```text
User 1 ───── owns ──────── * Listing
User 1 ───── authors ───── * Review
Listing 1 ── references ── * Review
```

| Model | Important fields | Relationships and behavior |
| --- | --- | --- |
| `User` | `email`, plus `username`, password `hash`, and `salt` supplied by Passport Local Mongoose | Owns listings and authors reviews; email is required but is not currently verified or declared unique |
| `Listing` | `title`, `description`, `image`, `price`, `location`, `country` | References one owner and many reviews; an empty image string receives a default image; deleting a listing cascades to its referenced reviews |
| `Review` | `comment`, `rating`, `createdAt` | References one author; rating is constrained to 1–5 in both Joi and Mongoose |

## Application Routes

The application renders HTML rather than exposing a JSON API. Browser forms use `?_method=PUT` and `?_method=DELETE` where noted.

| Method | Route | Access | Behavior |
| --- | --- | --- | --- |
| `GET` | `/` | Public | Returns the plain-text response `Working`; the catalog currently starts at `/listings` |
| `GET` | `/signup` | Public | Renders the account-registration form |
| `POST` | `/signup` | Public | Registers an email/username/password account and intends to establish a login session before redirecting to `/listings` |
| `GET` | `/login` | Public | Renders the login form |
| `POST` | `/login` | Public | Authenticates with Passport; redirects failures to `/login` and successes to the saved destination or `/listings` |
| `GET` | `/logout` | No explicit guard | Ends the current Passport session and redirects to `/listings` |
| `GET` | `/listings` | Public | Fetches and renders every listing |
| `GET` | `/listings/new` | Signed-in user | Renders the new-listing form; unauthenticated users are sent to `/login` |
| `POST` | `/listings` | Signed-in user + valid body | Creates a listing and assigns the current user as its owner |
| `GET` | `/listings/:id` | Public | Renders one listing with its owner, reviews, and populated review authors |
| `GET` | `/listings/:id/edit` | Listing owner | Renders a prefilled edit form |
| `PUT` | `/listings/:id` | Listing owner + valid body | Updates listing fields; submitted by the HTML form through method override |
| `GET` | `/listings/:id/delete` | Listing owner | Deletes a listing and its referenced reviews, then returns to the catalog |
| `POST` | `/listings/:id/reviews` | Signed-in user + valid body | Creates an authored review and attaches it to the listing |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Review author | Removes the review reference and document; submitted through method override |
| `ALL` | Any unmatched route | Public | Forwards a `Page Not Found` error to the shared error view |

> [!NOTE]
> Listing deletion and logout are currently state-changing `GET` requests. A production revision should use `DELETE`/`POST` plus CSRF protection.

## Authentication and Authorization

Wanderlust uses local, session-backed authentication:

1. **Registration** — `User.register()` from Passport Local Mongoose stores the username and a derived password hash/salt alongside the required email. The raw password is not stored in the user document.
2. **Login** — Passport Local validates the default `username` and `password` form fields.
3. **Session** — Passport serializes the user identifier into an Express Session and restores `req.user` on later requests.
4. **Return URL** — when a guest requests a protected page, `isLoggedIn` stores the original URL; a successful login returns the user there.
5. **Template state** — `req.user` is exposed as `currentLoginStatus`, allowing EJS views to show the correct navigation and ownership controls.
6. **Authorization** — `isOwner` protects listing mutations, while `isReviewAuthor` protects review deletion. These checks run on the server in addition to hiding controls in the UI.

### Current session configuration

| Setting | Current behavior |
| --- | --- |
| Store | Default in-memory Express Session store |
| Lifetime | Seven days |
| Cookie flags | `httpOnly: true`; `secure` and `sameSite` are not configured |
| Session creation | `saveUninitialized: true`; anonymous visitors can receive a session cookie |
| Resaving | `resave: false` |
| Secret | Hard-coded development value in `app.js` |
| User feedback | Connect Flash messages exposed to all EJS views |

The current store and secret configuration are suitable only for local development. See [Environment Variables](#environment-variables) and [Current Limitations](#current-limitations) before deploying.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) `20.19.0` or newer (required by the current dependency graph)
- npm, included with Node.js
- A local [MongoDB](https://www.mongodb.com/docs/manual/installation/) server listening on `127.0.0.1:27017`

### Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/KaiserFury/Full-Stack-project.git
   cd Full-Stack-project
   ```

2. Install the locked dependencies.

   ```bash
   npm ci
   ```

   Use `npm install` instead when intentionally updating the lockfile.

3. Start MongoDB and confirm that the local server accepts connections at:

   ```text
   mongodb://127.0.0.1:27017/WanderLust
   ```

4. Start the application.

   ```bash
   node app.js
   ```

5. Open the listing catalog:

   ```text
   http://localhost:8080/listings
   ```

> [!NOTE]
> There is currently no `start` or `dev` script in `package.json`; `node app.js` is the supported launch command. The root URL (`/`) only returns `Working`.

## Environment Variables

**No environment variables are consumed by the current codebase.** The database address, session secret, and port are hard-coded, so creating a `.env` file alone will not change the application.

| Recommended variable | Current source | Purpose | Status |
| --- | --- | --- | --- |
| `MONGO_URI` | `app.js` and `init/index.js` | MongoDB connection string | Not wired yet |
| `SESSION_SECRET` | `app.js` | Strong secret used to sign session identifiers | Not wired yet |
| `PORT` | `app.js` | HTTP listening port | Not wired yet |
| `NODE_ENV` | Not present | Development/production behavior switch | Not wired yet |

After the application is updated to read `process.env`, a local configuration could look like this:

```dotenv
# Proposed configuration — this file is not read by the current implementation.
MONGO_URI=mongodb://127.0.0.1:27017/WanderLust
SESSION_SECRET=replace-with-a-long-random-secret
PORT=8080
NODE_ENV=development
```

Before adopting this configuration, wire the variables into both the app and seed script, add `.env` to `.gitignore`, and never commit real secrets. For local file-based configuration, launch with `node --env-file=.env app.js` or configure a dotenv loader; reading `process.env` does not load a `.env` file by itself. Production deployments should also use a persistent session store such as MongoDB or Redis.

## Database Seeding

The repository contains 29 sample destination listings in `init/data.js`, but the seed runner is intentionally **not** part of the normal setup path.

> [!CAUTION]
> `node init/index.js` runs `Listing.deleteMany({})` first. It deletes every listing in the configured database, cannot restore them, and then assigns one hard-coded owner ObjectId to all samples. The script does not create that user.

For a disposable local database only:

1. Register a local user.
2. Find that user's MongoDB ObjectId with MongoDB Compass or `mongosh`.
3. Replace the hard-coded owner ID in `init/index.js` with the real user ID.
4. Confirm that `WanderLust` contains no listing data you need to keep.
5. Run:

   ```bash
   node init/index.js
   ```

   The script does not disconnect Mongoose. If the process remains active after `data was initialized`, stop it with <kbd>Ctrl</kbd>+<kbd>C</kbd>.

For the safest first run, skip seeding, sign in, and create listings through the UI.

## How to Use Wanderlust

1. **Start the services** — run MongoDB, launch `node app.js`, and visit `/listings`.
2. **Browse publicly** — open any listing card to read property details and community reviews.
3. **Create an account** — select **SignUp**, then enter an email, username, and password.
4. **Log in** — authenticate from `/login`. If login was required by a protected page, Wanderlust redirects you back to that page.
5. **Publish a listing** — choose **Add new Listings**, complete every required field, optionally provide an image URL, and submit.
6. **Manage your listing** — open a listing you own to reveal its **Edit details** and **Delete listing** controls.
7. **Leave a review** — while signed in, choose a rating from 1 to 5, enter a comment, and submit it from a listing page.
8. **Manage your review** — the delete control appears only on reviews authored by your account.
9. **Log out** — use the navigation link to end the current session and return to the catalog.

Wanderlust does not currently accept reservations or payments; nightly prices are display-only.

## Validation and Error Handling

| Input or event | Current handling |
| --- | --- |
| Listing submission | Joi requires title, description, location, country, and a non-negative price; image may be blank or null |
| Review submission | Joi requires a comment and a numeric rating from 1 through 5 |
| Signup and login | Browser fields are required and signup uses `type="email"`, but there is no server-side Joi schema for credentials; email is not normalized, unique, or verified |
| Browser forms | Bootstrap validation prevents obviously incomplete forms and displays validation states |
| Async failures | `wrapAsync` forwards rejected route handlers to the Express error middleware |
| Missing listing on `GET /listings/:id` | A flash error redirects the visitor to `/listings` |
| Unknown route | A custom `ExpressError` renders the shared error page |
| Listing deletion | Mongoose post middleware removes reviews referenced by the deleted listing |

## Current Limitations

Wanderlust is an active development project and needs the following work before production use:

| Area | Current state | Production direction |
| --- | --- | --- |
| Configuration | MongoDB URI, session secret, and port are hard-coded | Read validated environment variables and rotate all secrets |
| Sessions | Uses Express Session's in-memory store | Use a persistent store, secure cookies, `sameSite`, and environment-aware settings |
| Request security | No CSRF protection, rate limiting, security headers, or explicit sanitization layer | Add CSRF defenses, Helmet, throttling, input hardening, and security tests |
| Account validation | Authentication forms have no server-side request schema; email is only marked required in Mongoose | Validate and normalize credentials, enforce the intended email policy, and add verification |
| HTTP semantics | Listing deletion and logout use `GET` | Move mutations to `DELETE`/`POST` and protect them against CSRF |
| Signup flow | The handler attempts duplicate flash/redirect responses and its login callback lacks a defined `next` parameter | Consolidate the response path and add authentication integration tests |
| Error responses | The shared renderer does not apply the stored HTTP status code | Send the correct `4xx`/`5xx` status before rendering |
| Record integrity | Ownership guards assume referenced records exist, and review deletion does not confirm that `:reviewId` belongs to the supplied listing | Add defensive not-found checks and validate the parent-child relationship before mutation |
| Seed data | Destructive reset with a hard-coded owner that may not exist | Parameterize the owner, create seed users, and require explicit confirmation |
| Developer scripts | No `start`/`dev` script; `npm test` is a failing placeholder; package `main` points to a missing file | Add reliable lifecycle, lint, formatting, and test scripts |
| Incomplete links | Footer links for privacy and terms have no matching routes | Implement the pages or remove the links |
| Product scope | No booking calendar, search, maps, uploads, wishlist, chat, payments, or admin tools | Deliver these incrementally through the roadmap below |

## Future Scope and Roadmap

### 1. Trust, security, and quality foundation

- [ ] **Email verification** — issue expiring, single-use verification tokens and restrict sensitive actions until an address is verified.
- [ ] **Password reset** — add rate-limited reset requests, short-lived hashed tokens, session revocation, and neutral responses that do not reveal whether an account exists.
- [ ] **Hardened authentication** — fix the signup response flow, add optional passkeys, strengthen cookies, rotate session identifiers, and support a persistent session store.
- [ ] **Testing** — cover models and middleware with unit tests, routes/auth with integration tests, and primary user journeys with end-to-end browser tests.
- [ ] **Docker** — provide repeatable Node and MongoDB containers, health checks, non-root runtime configuration, and a development Compose file.
- [ ] **CI/CD** — use an automated pipeline for dependency installation, linting, tests, security checks, container builds, preview deployments, and controlled production releases.

### 2. Discovery and retention

- [ ] **Search, filters, and maps** — add pagination, price/country filters, full-text search, GeoJSON locations, nearby search, and map-bounds queries.
- [ ] **Wishlist** — let authenticated users save unique listing references, organize favorites, and quickly revisit them across devices.
- [ ] **Managed image uploads** — replace arbitrary external URLs with validated object storage, responsive formats, thumbnails, and automatic optimization.
- [ ] **Notifications** — build preference-aware in-app, email, and web-push notifications for messages, reviews, listing changes, and future booking events.
- [ ] **Progressive Web App (PWA)** — add a manifest, installability, offline fallbacks, cached recently viewed/saved listings, and safe background updates.

### 3. Marketplace capabilities

- [ ] **Availability and reservations** — model date ranges, guest counts, pricing rules, inventory locks, cancellations, and time-zone-safe calendars.
- [ ] **Real-time chat** — give guests and hosts listing-scoped conversations with delivery state, unread counts, moderation tools, reconnect recovery, and durable history.
- [ ] **Payments** — add marketplace-ready checkout, idempotent webhooks, host onboarding and payouts, platform fees, receipts, refunds, disputes, and reconciliation.
- [ ] **Admin panel** — introduce role-based access for user/listing/review moderation, reports, audit logs, verification queues, and operational metrics.

### 4. Intelligence, scale, and reliability

- [ ] **AI recommendations** — combine semantic listing embeddings with price/location constraints and privacy-aware signals from views, wishlists, and reviews; always retain explainable non-AI discovery paths.
- [ ] **Performance improvements** — add database indexes, pagination, lean projections, query analysis, responsive/lazy-loaded images, caching, compression, CDN delivery, and Core Web Vitals monitoring.
- [ ] **Observability** — introduce structured logs, traces, metrics, uptime checks, error tracking, dashboards, and actionable alerts.
- [ ] **Accessibility and localization** — target WCAG 2.2 AA, complete keyboard and screen-reader flows, support localized dates/currencies, and make text translatable.

## Latest Trends and Opportunities

The following opportunities reflect web-platform and marketplace directions reviewed in **July 2026**. They are recommendations, not implemented features.

| Trend | How it can enhance Wanderlust | Expected value |
| --- | --- | --- |
| [Hybrid and vector search](https://www.mongodb.com/docs/atlas/atlas-vector-search/hybrid-search/vector-search-with-full-text-search/) | Embed listing text, interpret natural-language intent such as “quiet beach stay under ₹3,000,” and combine semantic results with exact price/location filters | More relevant discovery and a practical foundation for AI recommendations |
| [Passkeys with WebAuthn Level 3](https://www.w3.org/TR/webauthn-3/) | Offer phishing-resistant sign-in alongside the existing credential flow while preserving account-recovery options; Level 3 is currently a W3C Candidate Recommendation Snapshot | Less password friction and stronger account security |
| [Cross-document View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) | Progressively animate catalog-to-detail navigation in the existing multi-page EJS app without requiring a SPA rewrite, while preserving normal navigation as the fallback | A more polished interface with limited architectural disruption |
| [Installable, offline-capable PWAs](https://www.w3.org/TR/appmanifest/) | Combine a web app manifest with [service workers](https://www.w3.org/TR/service-workers/) and opt-in [push](https://www.w3.org/TR/push-api/) to cache the application shell and saved/recent listings and deliver relevant updates | Better repeat engagement and resilience on unreliable travel networks |
| [Resilient real-time experiences](https://socket.io/docs/v4/rooms/) | Use authenticated rooms and [connection-state recovery](https://socket.io/docs/v4/connection-state-recovery) for chat, typing indicators, presence, and future reservation updates | Faster guest-host communication despite temporary disconnects |
| [Geospatial discovery](https://www.mongodb.com/docs/manual/core/indexes/index-types/geospatial/2dsphere/) | Store coordinates as GeoJSON and apply `2dsphere` indexes for nearby, radius, and map-viewport searches | Location-aware browsing that scales beyond plain location strings |
| [Marketplace-native payment infrastructure](https://docs.stripe.com/connect/how-connect-works) | Once reservations exist, use connected-account onboarding, platform fees, payouts, refunds, disputes, and webhook-driven reconciliation rather than a basic one-party checkout | A safer path from listing platform to two-sided marketplace |
| [Core Web Vitals and inclusive UX](https://web.dev/articles/defining-core-web-vitals-thresholds) | Measure LCP, INP, and CLS; optimize listing images and queries; and pair performance work with [WCAG 2.2](https://www.w3.org/TR/WCAG22/) accessibility reviews | Faster discovery, broader access, a more consistent experience, and measurable quality |

## Contributing

Contributions, issue reports, and feature proposals are welcome.

1. Fork the repository.
2. Create a focused branch: `git checkout -b feature/short-description`.
3. Make and manually verify your change; add automated tests when test infrastructure is introduced.
4. Commit with a clear message.
5. Push the branch and open a pull request describing the behavior, screenshots, and verification performed.

Please avoid mixing unrelated refactors with a feature or bug fix, and never commit credentials or local database data.

## License

The package metadata currently declares the project under the **ISC License**, but the repository does not yet include a standalone `LICENSE` file. Add one so the terms are explicit to visitors and downstream users.

---

<div align="center">
  <sub>Built with Node.js, Express, MongoDB, EJS, and a love of discovering new places.</sub>
  <br />
  <a href="#top">Back to top</a>
</div>
