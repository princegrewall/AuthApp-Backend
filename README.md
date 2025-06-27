# AuthApp

A backend authentication system built with **Node.js**, **Express**, and **MongoDB**. This app includes features like user registration, login, and JWT-based authentication.

## 🚀 Features

- User Signup and Login
- Password hashing with Bcrypt
- JWT Authentication and Authorization
- MongoDB for persistent storage

## 📦 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **Security:** Bcrypt, JWT
- **Tools:** Nodemon, dotenv

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/princegrewall/AuthApp-Backend.git
   cd AuthApp

Install dependencies

npm install

Create a .env file in the root directory and add:

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

Run the application

nodemon index.js


