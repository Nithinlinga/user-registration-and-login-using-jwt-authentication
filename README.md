# User Authentication System

A simple **User Authentication System** built using **Node.js, Express, MongoDB, JWT, and Zod** for validation.

## 📜 Features
- User **Registration**
- User **Login**
- **Password Reset**
- **JWT-based Authentication**
- Input validation using **Zod**
- Secure **Password Hashing** with bcrypt
- Proper **Error Handling**

---

## 🚀 Installation

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/Nithinlinga/user-registration-and-login-using-jwt-authentication
cd user-registration-and-login-using-jwt-authentication

npm install

PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d


npm start


API Routes

http://localhost:5000/api/auth/register

Request Body:
{
  "name": "user_name",
  "email": "user_name@example.com",
  "password": "password_of_6_digits"
}

response will be:
{
  "token": "your-jwt-token",
  "message": "User registered successfully"
}

http://localhost:5000/api/auth/login

Request Body:
{
  "email": "user_name@example.com",
  "password": "password_of_6_digits"
}

response will be:
{
  "token": "your-jwt-token",
  "message": "User loggedin successfully"
}

http://localhost:5000/api/auth/reset-password

Request Body:
{
  "email": "user_name@example.com",
  "password": "new_password_of_6_digits"
}

response will be:
{
  "msg": "Password has been reset successfully, Please Login"
}


