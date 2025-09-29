# User Management API

A RESTful API built with Node.js, Express, TypeScript, and MongoDB for managing user data. This application provides full CRUD (Create, Read, Update, Delete) operations for user entities with comprehensive input validation.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Data Validation](#data-validation)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [License](#license)

## Features

- **Complete CRUD Operations**: Create, read, update, and delete users
- **Input Validation**: Comprehensive validation using express-validator
- **MongoDB Integration**: Mongoose ODM for database operations
- **TypeScript Support**: Full TypeScript implementation for type safety
- **Error Handling**: Structured error responses with appropriate HTTP status codes
- **Query Filtering**: Dynamic query filtering for GET requests
- **RESTful Design**: Follows REST API conventions

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Validation**: express-validator
- **Environment**: dotenv

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Install required packages (if not already in package.json):
```bash
npm install express mongoose express-validator dotenv body-parser
npm install -D @types/express @types/node typescript ts-node
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/your-database-name
```

For MongoDB Atlas:
```env
PORT=3000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

## Running the Application

### Development Mode
```bash
npm run dev
# or
npx ts-node index.ts
```

### Production Mode
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000` (or your specified PORT).

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/` | Create a new user | `{ "name": "string", "age": number }` |
| GET | `/` | Get all users (with optional filtering) | N/A |
| GET | `/:id` | Get user by ID | N/A |
| PATCH | `/:id` | Update user by ID | `{ "name": "string", "age": number }` |
| DELETE | `/:id` | Delete user by ID | N/A |

### Request/Response Examples

#### Create User
```http
POST /
Content-Type: application/json

{
  "name": "John Doe",
  "age": 30
}
```

Response:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "age": 30,
  "__v": 0
}
```

#### Get All Users
```http
GET /
```

Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "age": 30
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "age": 25
  }
]
```

#### Get Users with Filtering
```http
GET /?age=30&name=John
```

#### Get User by ID
```http
GET /507f1f77bcf86cd799439011
```

#### Update User
```http
PATCH /507f1f77bcf86cd799439011
Content-Type: application/json

{
  "age": 31
}
```

#### Delete User
```http
DELETE /507f1f77bcf86cd799439011
```

Response:
```json
"User 507f1f77bcf86cd799439011 has been deleted"
```

## Data Validation

The API implements comprehensive input validation:

### User Creation (`POST /`)
- `name`: Required string, cannot be empty
- `age`: Optional non-negative integer

### User Update (`PATCH /:id`)
- `name`: Optional string
- `age`: Optional non-negative integer
- `id`: Must be a valid MongoDB ObjectId

### Validation Error Response
```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Name is required.",
      "path": "name",
      "location": "body"
    }
  ]
}
```

## Error Handling

The API provides structured error responses:

- **422 Unprocessable Entity**: Validation errors
- **400 Bad Request**: General client errors
- **500 Internal Server Error**: Server-side errors
- **201 Created**: Successful operations (Note: Should be 200 for GET/PATCH/DELETE)

## Project Structure

```
├── index.ts                 # Application entry point
├── src/
│   ├── models/
│   │   └── user.model.ts    # User model definition
│   └── routes/
│       ├── userRoute.ts     # User route handlers
│       └── validation.ts    # Validation middleware
├── .env                     # Environment variables
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

### File Descriptions

- **`index.ts`**: Main application file that sets up Express server, connects to MongoDB, and configures middleware
- **`user.model.ts`**: Mongoose model definition for User with TypeScript interfaces
- **`userRoute.ts`**: Express router with all CRUD endpoint implementations
- **`validation.ts`**: Express-validator middleware for input validation and error handling

## Usage Examples

### Using curl

Create a user:
```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "age": 28}'
```

Get all users:
```bash
curl http://localhost:3000/
```

Update a user:
```bash
curl -X PATCH http://localhost:3000/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"age": 29}'
```

### Using JavaScript/Node.js

```javascript
const axios = require('axios');

// Create user
const createUser = async () => {
  try {
    const response = await axios.post('http://localhost:3000/', {
      name: 'Bob Wilson',
      age: 35
    });
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
```

## Development Notes

1. **Status Code Issue**: The current implementation returns 201 (Created) for all successful operations. Consider updating GET, PATCH, and DELETE operations to return 200 (OK).

2. **Error Handling**: The application could benefit from more specific error handling, especially for cases like "user not found" (404 status).

3. **Middleware**: The validation middleware is well-structured and reusable across different routes.

4. **TypeScript**: The project makes good use of TypeScript interfaces for type safety.

## Future Enhancements

- Add pagination for GET requests
- Implement user authentication and authorization
- Add request logging middleware
- Include unit and integration tests
- Add API documentation with Swagger
- Implement data sanitization
- Add rate limiting
- Include health check endpoints

## License

This project is licensed under the MIT License. See the LICENSE file for details.