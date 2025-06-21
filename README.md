# BackendP - First Backend Project

A comprehensive backend application built as a foundational project to demonstrate server-side development skills and best practices.

## 🚀 Features

- RESTful API endpoints
- Database integration
- User authentication and authorization
- Data validation and error handling
- Middleware implementation
- Environment configuration
- Logging and monitoring

## 🛠️ Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB/PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi/Express-validator
- **Environment Management**: dotenv
- **Development Tools**: Nodemon, ESLint, Prettier

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB/PostgreSQL (depending on your database choice)
- Git

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Mudit62004/backendP.git
cd backendP
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

4. Start the development server:
```bash
npm run dev
```

## 🚦 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Example Request/Response

**POST /api/auth/register**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

## 📁 Project Structure

```
backendP/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── error.js
│   │   └── validation.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── utils/
│   │   ├── database.js
│   │   └── helpers.js
│   └── app.js
├── tests/
│   ├── auth.test.js
│   └── users.test.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```


## 🔒 Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet for security headers
- Environment variable protection

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 3000) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `DATABASE_URL` | Database connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRES_IN` | JWT expiration time | No (default: 7d) |

## 📝 Error Handling

The application includes comprehensive error handling:

- Global error middleware
- Custom error classes
- Validation error responses
- Database error handling
- 404 route handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 👤 Author

**Mudit**
- GitHub: [@Mudit62004](https://github.com/Mudit62004)



**Note**: This is a learning project created to demonstrate backend development skills. 
