## JUT Authentication Project About Project
This is a simple JMT Authentication project made using React.js and Node.js
## The project allows a user to:
.Register an account
.Login with username and password
.Get a JMT token after successful login
.Access a protected route
.Logout from the application

## Technologies Used
Frontend 

.React.js
.CSS
.JavaScript

## Backend

.Node.js
.Express.js
JWT
Bcrypt
CORS

## Project Structure
tsk36
│
├── backend
│   ├── package.json
│   └── server.js
│
└── frontend
    ├── src
    │   ├── App.jsx
    │   ├── App.css
    │   └── index.css
    └── package.json

## How to Run
1. Strat Backend
open terminal and go to the backend folder:

cd backend

install packages if needed:

npm install
start the server
node server.js

The backend will run on:

http://localhost:5000

2. Strat Frontend
Open another terminal:
cd frontend
Install packages:
npm install

Start React:
npm run dev
THe frontend will run on the VIte URL show in the terminal.

## How Authentication Works
First, the User registers with a username and password.
THe password is hashed using bcrypt before it is stored.
When the user logs in , the password is check.if is correct, the server creates a JWT token.
the token is stored in browser localStorage.
when the user tries to access the protected route, the token is sent in the Authorization header.
the backend checks the token before allowing access.
## Main Routes
Method	Route	Purpose
GET	/	Check if server is running
POST	/register	Register a new user
POST	/login	Login and get JWT token
GET	/protected	Access protected data


## What I Learned.....


WHile making this project,I learned:
.How Express routes work
.How to use React state with useState
.How passwords can be hashed using bcrypt
.How JWT tokens are created
.How protected routes work
.How to send request React to an Express Server
.Hoe to store and remove a JWT token using localStorage

## Note

This is a learning project made to understand basic JWT authentication and React with Node.js


## Aouther

Ashish kumar