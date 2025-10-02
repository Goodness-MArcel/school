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
