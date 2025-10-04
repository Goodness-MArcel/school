# School Management Platform

A full-stack web application for managing school operations, built with React (Vite) for the frontend and Node.js/Express for the backend. Includes authentication, role-based access, and integration with Supabase.

## Features

- User registration and login (students, teachers, administrators)
- Role selection during signup
- School registration
- Protected routes and authentication middleware
- Dashboard and views for login, signup, and school management
- Supabase integration for authentication and data storage

## Technologies Used

### Frontend
- React (Vite)
- CSS (custom styles)
- FontAwesome icons
- Supabase client

### Backend
- Node.js
- Express.js
- Supabase
- EJS views

## Folder Structure

```
client/
  src/
    component/        # React components (Login, Signup, RegisterSchool)
    context/          # Auth context for global state
    assets/           # Static assets
    supabaseClient.js # Supabase client setup
  public/             # Public images and assets
  ...
server/
  controller/         # Route controllers
  db/                 # Database configuration
  middleware/         # Auth middleware
  routes/             # Express routes
  views/              # EJS templates (dashboard, login, signup)
  supabase.js         # Supabase integration
  ...
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Goodness-MArcel/school.git
   cd school
   ```

2. **Install dependencies:**
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Configure environment variables:**
   - Create `.env` files in both `client` and `server` folders as needed.
   - Example for server:
     ```env
     PORT=5000
     SUPABASE_URL=your_supabase_url
     SUPABASE_KEY=your_supabase_key
     ```

4. **Run the development servers:**
   - Start the backend:
     ```sh
     npm start
     ```
   - Start the frontend:
     ```sh
     cd ../client
     npm run dev
     ```

5. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:5000](http://localhost:5000)

## Scripts

### Client
- `npm run dev` — Start Vite development server
- `npm run build` — Build for production

### Server
- `npm start` — Start Express server

## License

This project is licensed under the MIT License.

## Author

Goodness Marcel

---

## API Endpoints

The backend exposes several RESTful endpoints for authentication, user management, and school operations. Example endpoints:

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT
- `GET /api/users/:id` — Get user details
- `POST /api/school/register` — Register a new school
- `GET /api/dashboard` — Get dashboard data

Refer to the `server/routes` and `server/controller` folders for more details and custom endpoints.

## Deployment

To deploy the application:

1. Build the frontend:
  ```sh
  cd client
  npm run build
  ```
2. Serve the build folder using a static server or integrate with your backend.
3. Ensure environment variables are set for production in both client and server.
4. Use a process manager like PM2 for the Node.js backend in production.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes
4. Push to your branch and open a pull request

Please follow the code style and add documentation/comments where necessary.

## Troubleshooting

- If you encounter CORS errors, check your backend configuration.
- Ensure Supabase credentials are correct in `.env` files.
- For database issues, verify your Supabase setup and network connectivity.
- Check logs in the terminal for error messages.

## Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Supabase](https://supabase.com/)
- [FontAwesome](https://fontawesome.com/)

---
