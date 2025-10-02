import React, { Suspense, lazy } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // global styles

// Lazy imports
const Dashboard = lazy(() => import("./admin/Dashboard.jsx"));
const Signup = lazy(() => import("./component/Signup"));
const Login = lazy(() => import("./component/Login"));
const RegisterSchool = lazy(() => import("./component/RegisterSchool"));

// Dashboard subpages
const DashboardHome = lazy(() => import("./admin/pages/DashboardHome.jsx"));
const ManageClassess = lazy(() => import("./admin/pages/Product.jsx"));
const Teachers = lazy(()=>import("./admin/pages/Teachers.jsx"));
const Student = lazy(()=>import("./admin/pages/Student.jsx"));
const Attendance = lazy(()=>import("./admin/pages/Attendance.jsx"));
const Timetable = lazy(()=>import("./admin/pages/Timetable.jsx"));
const Reports = lazy(()=>import("./admin/pages/Reports.jsx"));
const Assessment = lazy(()=>import("./admin/pages/Assessment.jsx"));
const Messages = lazy(()=>import('./admin/pages/Messages.jsx'))
const Settings = lazy(() => import("./admin/pages/Settings.jsx"));

const Loading = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div className="con">
      <div className="spinner-border spinner-border-app text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regschool" element={<RegisterSchool />} />

          {/* Dashboard with nested routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<ManageClassess />} />
            <Route path="teachers" element={<Teachers/>}/>
            <Route path="student" element={<Student/>}/>
            <Route path="attendance" element={<Attendance/>}/>
            <Route path="time_table" element={<Timetable/>}/>
            <Route path="report" element={<Reports/>}/>
            <Route path="assessment" element={<Assessment/>}/>
            <Route path="messages" element={<Messages/>}/>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
