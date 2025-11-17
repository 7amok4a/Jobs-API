# Jobs API

A RESTful API for managing job applications built with Node.js, Express, and MongoDB. This API allows users to track their job applications with features like authentication, CRUD operations, and security measures.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT
- **Job Management**: Create, read, update, and delete job applications
- **Security**: Rate limiting, CORS, Helmet protection
- **User-specific Data**: Each user can only access their own jobs
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Comprehensive error handling middleware

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jobs-api.git
cd jobs-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EXPIREIN=30d
```

4. Start the server:
```bash
npm start
```

## 📚 API Endpoints

### Authentication

#### Register a New User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Jobs (All routes require authentication)

#### Create a Job
```http
POST /api/v1/jobs
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "company": "Tech Company",
  "position": "Software Engineer",
  "status": "pending"
}
```

#### Get All Jobs
```http
GET /api/v1/jobs
Authorization: Bearer <your_token>
```

#### Get Single Job
```http
GET /api/v1/jobs/:id
Authorization: Bearer <your_token>
```

#### Update Job
```http
PATCH /api/v1/jobs/:id
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "company": "Updated Company",
  "position": "Senior Developer",
  "status": "interview"
}
```

#### Delete Job
```http
DELETE /api/v1/jobs/:id
Authorization: Bearer <your_token>
```

## 📊 Data Models

### User Model
```javascript
{
  name: String (required, 3-50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed)
}
```

### Job Model
```javascript
{
  company: String (required, max 50 chars),
  position: String (required, max 100 chars),
  status: String (enum: ['pending', 'interview', 'declined'], default: 'pending'),
  createdBy: ObjectId (reference to User),
  timestamps: true
}
```

## 🔒 Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Enables Cross-Origin Resource Sharing
- **Rate Limiting**: Limits requests to 100 per 15 minutes
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Uses bcrypt for password encryption

## 🗂️ Project Structure

```
├── controllers/
│   ├── auth.controller.js
│   └── jobs.controller.js
├── database/
│   └── connect.js
├── errors/
│   ├── bad-request.js
│   ├── custom-error.js
│   ├── notFoundError.js
│   ├── unAuthError.js
│   └── index.js
├── middleware/
│   ├── asyncWrapper.js
│   ├── authentication.js
│   ├── errorHandler.js
│   └── notFoundHandler.js
├── models/
│   ├── jobs.module.js
│   └── user.module.js
├── routers/
│   ├── auth.router.js
│   └── jobs.router.js
├── .env
├── server.js
└── package.json
```

## 🚦 Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## ⚠️ Error Responses

All errors follow this format:
```json
{
  "msg": "Error message description"
}
```

## 🔧 Dependencies

- express
- mongoose
- bcrypt
- jsonwebtoken
- dotenv
- helmet
- cors
- express-rate-limit
- http-status-codes


## 👤 Author

7amok4a 

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!