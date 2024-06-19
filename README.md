# User Management API

## Project Description

This project provides a set of RESTful APIs for user management using Node.js and MongoDB. The APIs support user registration (with OTP verification), login, password reset, and profile updates. The following endpoints are implemented:

- **Signup API**: Register a new user and send an OTP for email verification.
- **Login API**: Authenticate an existing user.
- **Forgot Password API**: Initiate a password reset request.
- **Reset Password API**: Reset the user's password using a link sent to their email.
- **Profile Update API**: Update user profile details.

### Installation

1. **Clone the Repository**
   git clone: https://github.com/hrd05/evitalRx-assignment.git

2. **Install Dependencies**
   npm install

3. **Set Up Environment Variables**
   Create .env file in your root directory and add the following

   JWT_TOKEN='d3ec4a17b9e89ca0527bba8eab6b546c3c75931f3c245a81503c81732d9d8ef4'
   DB_URI='mongodb+srv://harshdunkhwal55:hbCkEDLtWHpEFNiB@cluster0.al3derw.mongodb.net/evitalRxUsers?retryWrites=true&w=majority&appName=Cluster0'
   EMAIL='harshdunkhwal55@gmail.com'
   GMAIL_PASS="ubdbtngpcbhgciah"

### Running the Application

1. **Start the Server**
   npm start

### API Documentation

You can find detailed API documentation and examples in the provided Postman collection:

Postman Documentation: https://documenter.getpostman.com/view/29678206/2sA3XTeKj4
