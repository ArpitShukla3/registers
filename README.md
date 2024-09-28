
# RaftLabs Media Management Application

This is a Node.js server application built with TypeScript, Express, and MongoDB. It provides functionality for user authentication and media management, with support for GraphQL API.

## Features

- User registration and login with email and password
- JSON Web Token (JWT) based authentication
- Create, read, update, and delete media items
- Filter media items by date range
- Search media items by title
- Pagination support for retrieving media items
- GraphQL API for querying and mutating user and media data

## Technologies Used

- Node.js
- TypeScript
- Express.js
- MongoDB (with Mongoose)
- JSON Web Token (JWT) for authentication
- Bcrypt for password hashing
- Zod for data validation
- Winston for logging
- Apollo Server for GraphQL API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or remote instance)

### Installation

1. Clone the repository:

```
git clone https://github.com/your-repo/raftlabs.git
```

2. Install dependencies:

```
cd raftlabs
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

Replace `<your-mongodb-uri>` with the connection URI for your MongoDB instance, and `<your-jwt-secret>` with a secret key for JWT token generation.

### Running the Application

1. Start the server:

```
npm start
```

The server will start running on `http://localhost:3000`.

### API Endpoints

#### REST API

- `POST /auth/register`: Register a new user
- `POST /auth/login`: User login
- `POST /auth/logout`: User logout
- `POST /media/create`: Create a new media item
- `POST /media/update/:id`: Update a media item by ID
- `GET /media/read`: Retrieve media items for the authenticated user (with pagination)
- `DELETE /media/delete/:id`: Delete a media item by ID
- `GET /media/readSingle/:id`: Retrieve a single media item by ID
- `GET /media/filterByDate`: Filter media items by date range
- `GET /media/search`: Search media items by title

#### GraphQL API

- `POST /graphqlUser`: GraphQL endpoint for user-related operations (no authentication required)
- `POST /graphqlMedia`: GraphQL endpoint for media-related operations (authentication required)

Please refer to the `src/graphql/user/schema.ts` and `src/graphql/media/schema.ts` files for the GraphQL schema definitions and available queries and mutations.