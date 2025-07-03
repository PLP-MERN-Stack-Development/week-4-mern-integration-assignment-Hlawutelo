# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Assignment Overview

You will build a blog application with the following features:
1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files for React app
│   ├── src/                # Main React source code
│   │   ├── components/     # Reusable UI components (buttons, forms, etc.)
│   │   ├── pages/          # Page-level components (PostList, Login, Register, etc.)
│   │   ├── hooks/          # Custom React hooks for logic reuse
│   │   ├── services/       # API service functions for HTTP requests
│   │   ├── context/        # React context providers (e.g., AuthContext)
│   │   └── App.jsx         # Main application entry point
│   └── package.json        # Front-end dependencies and scripts
├── server/                 # Express.js and Node.js back-end
│   ├── models/             # Mongoose models for MongoDB (User, Post, Category)
│   ├── routes/             # Express route handlers for API endpoints
│   ├── middleware/         # Custom middleware (auth, error handling, uploads)
│   ├── server.js           # Main server file (entry point for API)
│   └── package.json        # Back-end dependencies and scripts
└── README.md               # Project documentation (this file)
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week4-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements


## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

# MERN Blog Application

A full-stack blog platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project demonstrates CRUD operations, authentication, image uploads, pagination, search/filter, and comments.

---

## Features

- **User Authentication**: Register, login, and JWT-protected routes
- **Blog Posts**: Create, read, update, delete posts
- **Image Uploads**: Upload and serve featured images for posts
- **Pagination & Search**: Paginated post listing, search by title/content, filter by category
- **Categories**: Organize posts by category
- **Comments**: (Planned) Add and view comments on posts
- **RESTful API**: Well-structured endpoints for all resources
- **Error Handling**: Centralized error responses

---

## Project Structure

```
client/           # React front-end
  src/
    context/      # Auth context
    pages/        # Page components (Login, Register, PostList, etc.)
    services/     # API calls
    App.jsx       # Main app
server/           # Express.js back-end
  models/         # Mongoose models (User, Post, Category)
  routes/         # API routes
  middleware/     # Multer, auth, error handling
  server.js       # Main server file
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
2. **Install dependencies**
   - In `/client`: `npm install`
   - In `/server`: `npm install`
3. **Configure environment variables**
   - Copy `.env.example` to `.env` in both `/client` and `/server` and fill in values
4. **Start the servers**
   - In `/server`: `npm start` (or `npm run dev` for development)
   - In `/client`: `npm run dev`
5. **Access the app**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api](http://localhost:5000/api)

---

## API Endpoints

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/posts` — List posts (supports `page`, `limit`, `search`, `category`)
- `POST /api/posts` — Create post (auth required, supports image upload)
- `PUT /api/posts/:id` — Update post (auth required)
- `DELETE /api/posts/:id` — Delete post (auth required)
- `GET /api/categories` — List categories
- `POST /api/categories` — Create category (auth required)

---

## Testing

- Use [Postman](https://www.postman.com/) or similar tool to test API endpoints
- For image upload, use `form-data` with a `file` field
- Test authentication by including the JWT token in the `Authorization` header

---

## Screenshots

Include screenshots of your working app here (login, post list, create post, etc.)

---

## Resources
- [MongoDB Docs](https://docs.mongodb.com/)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Node.js Docs](https://nodejs.org/en/docs/)
- [Mongoose Docs](https://mongoosejs.com/docs/)

---

## License
MIT
