# MERN Blog Application

## What is this project?

This is a full-stack blog platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, log in, create and manage blog posts, upload images, comment on posts, and browse content with pagination, search, and filtering. The project demonstrates how to build a modern web application with seamless integration between front-end and back-end components.

## Key Features

- User registration and login (JWT authentication)
- Create, read, update, and delete blog posts
- Upload and display featured images for posts
- Add and view comments on blog posts
- Organize posts by categories
- Paginated, searchable, and filterable post list
- RESTful API with input validation and centralized error handling

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components (e.g., Comments)
│   │   ├── pages/          # Page components (PostList, SinglePost, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services (axios)
│   │   ├── context/        # React context providers (Auth)
│   │   └── AppRouter.jsx   # Main application router
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models (Post, Category, Comment, User)
│   ├── routes/             # API routes (posts, categories, comments, auth)
│   ├── middleware/         # Custom middleware (error handler, upload)
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## How to Use This Project

### Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)

### Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd mern-blog
   ```
2. **Install server dependencies:**
   ```sh
   cd server
   npm install
   ```
3. **Install client dependencies:**
   ```sh
   cd ../client
   npm install
   ```
4. **Set up environment variables:**
   - In `server/`, create a `.env` file:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     NODE_ENV=development
     ```
   - Optionally, in `client/`, create a `.env` file for `VITE_API_URL`.

### Running the Application
- **Start the server:**
  ```sh
  cd server
  npm start
  ```
- **Start the client:**
  ```sh
  cd client
  npm run dev
  ```
- Open your browser to `http://localhost:5173` (or as shown in your terminal).

### Using the App
1. Register a new user or log in with existing credentials.
2. Create, edit, or delete blog posts (with optional image upload).
3. Browse posts, search by keyword, or filter by category.
4. View a single post and add comments.
5. Manage categories and explore posts by category.

## API Endpoints

### Posts
- `GET /api/posts` - Get all posts (supports pagination, search, filter)
- `GET /api/posts/:id` - Get a single post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category

### Comments
- `GET /api/comments/:postId` - Get all comments for a post
- `POST /api/comments/:postId` - Add a comment to a post
- `DELETE /api/comments/:commentId` - Delete a comment

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login

## License

This project is for educational and demonstration purposes.
