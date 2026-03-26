# Fullstack Application – Backend API (Node.js)

## 📌 Description
REST API developed as part of a fullstack academic project, focused on user management, document handling, and subscription-based access control.

The system includes authentication, protected routes, business rules based on user plans, and a fully tested API using Postman.

---

## 🎯 Objective
To design and implement a scalable and secure backend using Node.js, applying best practices in API design, validation, authentication, and testing.

---

## 🛠️ Technologies
- Node.js
- Express
- MongoDB + Mongoose
- JWT (authentication)
- Bcrypt (password hashing)
- Joi (data validation)
- Postman (testing & documentation)
- Vercel (deployment)

---

## 🏗️ Architecture
The API follows a modular and layered structure:

- **Routing Layer**: Defines versioned endpoints (`/api/v1/...`)
- **Controller Layer**: Handles request/response logic
- **Service Layer**: Contains application logic and use case coordination
- **Data Access Layer**: Manages persistence via Mongoose models

Additional design decisions:
- Use of middleware for authentication and route protection  
- Validation layer using Joi to ensure data integrity  
- Separation of concerns to improve maintainability and scalability  

---

## 🔐 Authentication & Security
- JWT-based authentication for protected routes  
- Password hashing using Bcrypt  
- Input validation to prevent malformed requests  
- Implementation of best practices aligned with OWASP API Security Top 10 (as covered in class)  

---

## ⚙️ Features

### 🔓 Public Routes
- User registration  
- User login  
- Validation of unique usernames and required fields  

### 🔒 Protected Routes
- User profile management (plan upgrade: Plus → Premium)  
- CRUD operations for documents  
- Category retrieval for document classification  

### 📊 Business Rules
- Plus users: limited to 10 document creations  
- Premium users: unlimited document creation  
- Enforcement of constraints at backend level  

