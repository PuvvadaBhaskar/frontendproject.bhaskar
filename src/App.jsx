import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import TopNav from './components/TopNav'
import LoginPage from "./Homepage/LoginPage";
import SignupPage from "./Homepage/SignupPage";
import Home from './Homepage/Home'
import Explore from './Homepage/Explore'
import Place from './Homepage/Place'
import Homestays from './Homepage/Homestays'
import Booking from './Homepage/Booking'
import FoodMenu from './Homepage/FoodMenu'
import Dashboard from './Homepage/Dashboard'
import Contact from './Homepage/Contact'
import ReviewBooking from './Homepage/ReviewBooking'
import ChangePassword from './Homepage/ChangePassword'
import Admin from './Homepage/Admin'
import GuideDashboard from './Homepage/GuideDashboard'
import ManageUsers from './Homepage/ManageUsers'
import ManagePosts from './Homepage/ManagePosts'
import ManageTopics from './Homepage/ManageTopics'
import Proceedings from './Homepage/Proceedings'

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/home" element={<Home/>} />
  <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/proceedings" element={<Proceedings/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/explore" element={<Explore/>} />
  <Route path="/place/:id" element={<Place/>} />
  <Route path="/place/:id/homestays" element={<Homestays/>} />
  <Route path="/place/:id/homestays/book/:roomId" element={<Booking/>} />
  <Route path="/place/:id/homestays/book/:roomId/food" element={<FoodMenu/>} />
  <Route path="/place/:id/homestays/book/:roomId/review" element={<ReviewBooking/>} />
  <Route path="/change-password" element={<ChangePassword/>} />
            <Route path="/admin" element={<Admin/>} />
        <Route path="/guide" element={<GuideDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;