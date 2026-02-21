🎓 Eduverse – Backend (Online Education Platform)
📌 Overview

Eduverse is a scalable backend system for an Ed-Tech platform built using Node.js, Express.js, and MongoDB.

The backend powers features such as:

🔐 User Authentication & Authorization (JWT + OTP)

📚 Course Management

💳 Payment Integration (Razorpay)

☁️ Media Management (Cloudinary)

⭐ Course Ratings & Reviews

🔑 Password Reset & Email Verification

This project follows a Monolithic REST API Architecture and is designed to be secure, scalable, and maintainable.

🏗 System Architecture

The Eduverse backend follows a Client-Server Architecture.

Client (React / Mobile App)
        ↓
REST API (Node.js + Express)
        ↓
MongoDB Database
        ↓
External Services
  • Cloudinary
  • Razorpay
  • Email Service
⚙ Backend Technology Stack
Technology	Purpose
Node.js	Runtime environment
Express.js	Web framework
MongoDB	NoSQL Database
Mongoose	ODM for MongoDB
JWT	Authentication
Bcrypt	Password hashing
Razorpay	Payment gateway
Cloudinary	Media storage
Nodemailer	Email services
🔐 Core Features
1️⃣ Authentication & Authorization

User Signup (Student / Instructor)

Secure Login

JWT Token generation

Role-based access control

OTP Verification via Email

Forgot Password Flow

Password Reset

Security Practices:

Passwords hashed using Bcrypt

Protected routes middleware

JWT token validation

Role-based authorization

2️⃣ Course Management

Instructors can:

Create course

Edit course

Delete course

Add Sections & Subsections

Upload images & videos

Set pricing

Students can:

View courses

Enroll in courses

Rate courses

Track progress

3️⃣ Payment Integration

Razorpay checkout flow

Secure payment verification

Automatic course enrollment after successful payment

Payment signature validation

4️⃣ Media Management

Cloudinary integration

Secure upload of course thumbnails

Video content storage

Optimized CDN delivery

5️⃣ Course Content Handling

Course documentation stored in Markdown format

Structured content with:

Course

Section

SubSection

🗄 Database Schema Overview

MongoDB with Mongoose models.

👤 User Schema

firstName

lastName

email (unique)

password (hashed)

accountType (Student / Instructor / Admin)

enrolledCourses

courseProgress

verified

active

📚 Course Schema

courseName

courseDescription

instructor reference

category reference

price

rating & reviews

sections

📂 Section Schema

sectionName

course reference

🎥 SubSection Schema

videoUrl

description

duration

section reference

⭐ Rating & Review Schema

rating (1–5)

review text

user reference

course reference

🔌 API Design (RESTful)

Base URL:

/api
🔐 Authentication Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register new user
POST	/api/auth/login	Login and get JWT
POST	/api/auth/verify-otp	Verify email OTP
POST	/api/auth/forgot-password	Send password reset email
POST	/api/auth/reset-password	Reset password
📚 Course Routes
Method	Endpoint	Description
GET	/api/courses	Get all courses
GET	/api/courses/:id	Get course details
POST	/api/courses	Create new course
PUT	/api/courses/:id	Update course
DELETE	/api/courses/:id	Delete course
POST	/api/courses/:id/rate	Add rating
💳 Payment Routes
Method	Endpoint	Description
POST	/api/payment/create-order	Create Razorpay order
POST	/api/payment/verify	Verify payment
🛠 Installation Guide
1️⃣ Clone Repository
git clone <repo_url>
cd eduverse-backend
2️⃣ Install Dependencies
npm install
3️⃣ Environment Variables

Create .env file:

PORT=5000
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_secret_key
RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
CLOUDINARY_API_KEY=your_key
CLOUDINARY_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
4️⃣ Start Server
npm run dev

Server runs at:

http://localhost:5000
🧪 Testing

API tested using Postman

MongoDB tested via MongoDB Compass

Payment flow tested with Razorpay test mode

🔒 Security Implementations

Bcrypt password hashing

JWT authentication

Middleware-based route protection

Payment signature validation

OTP verification

Role-based authorization

📈 Scalability & Improvements

Future Improvements:

Redis caching

Microservices architecture

Rate limiting

API versioning

Admin management panel

Course recommendation system

Analytics dashboard

🚀 Project Highlights

✔ Complete Auth System (JWT + OTP)
✔ Secure Payment Integration
✔ Scalable NoSQL Database
✔ Role-based Access Control
✔ Cloud Media Handling
✔ Modular Backend Structure
