# 🌍 Smart Tourist Management System

## 📌 Project Overview

The Smart Tourist Management System is a web-based application developed
to simplify tour management and online booking processes. The system
allows users to register, log in, view available tour packages, and make
bookings through an easy-to-use interface.

This project was developed as part of the **IT21012 -- Social and
Professional Issues** module.

------------------------------------------------------------------------

## 🚀 Features

-   User Registration and Login
-   Secure Authentication (JWT)
-   View Tour Packages
-   Online Booking System
-   Admin Tour Management
-   MongoDB Database Integration

------------------------------------------------------------------------

## 🛠️ Technologies Used

### Frontend

-   HTML
-   CSS
-   JavaScript

### Backend

-   Node.js
-   Express.js

### Database

-   MongoDB (MongoDB Compass)

### Other Tools

-   Git & GitHub
-   Postman (API testing)

------------------------------------------------------------------------

## 📂 Project Structure

    project-root/
    │
    ├── frontend/        # Website UI
    ├── backend/         # Server and API
    │   ├── models/
    │   ├── routes/
    │   ├── controllers/
    │   └── server.js
    │
    └── README.md

------------------------------------------------------------------------

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

``` bash
git clone https://github.com/your-username/your-project-name.git
```

### 2️⃣ Install Dependencies

Navigate to backend folder:

``` bash
cd backend
npm install
```

------------------------------------------------------------------------

## 🗄️ MongoDB Compass Setup

1.  Install **MongoDB Compass**.
2.  Open MongoDB Compass.
3.  Click **New Connection**.
4.  Use connection string:

```{=html}
<!-- -->
```
    mongodb://localhost:27017/touristDB

5.  Click **Connect**.
6.  Database will be created automatically when the server runs.

------------------------------------------------------------------------

## 🔐 Environment Variables

Create a `.env` file inside the backend folder:

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/touristDB
    JWT_SECRET=your_secret_key

⚠️ Do NOT upload `.env` file to GitHub.

------------------------------------------------------------------------

## ▶️ Run the Project

Start backend server:

``` bash
npm start
```

or (development mode):

``` bash
npm run dev
```

------------------------------------------------------------------------

## 🌐 Run Frontend

Open the frontend folder and run using **Live Server** or open:

    index.html

------------------------------------------------------------------------

## 📊 System Architecture

Client → Frontend → Express Server → MongoDB Database

------------------------------------------------------------------------

## 👨‍💻 Contributors

-   Abhishek \_\_\_\_\_\_\_\_\_\_

-   

    ------------------------------------------------------------------------

------------------------------------------------------------------------

## 📚 Academic Purpose

This project was developed for educational purposes only.

------------------------------------------------------------------------

## 📄 License

This project is intended for academic use.
