import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import UserProfile from './components/authenticated/UserProfile'
import './App.css'
import AllRewards from './components/authenticated/AllRewards'
import AllRedemptions from './components/authenticated/AllRedemptions'
import AllActivities from './components/authenticated/AllActivities'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/all_rewards" element={<AllRewards />} />
          <Route path="/all_redemptions" element={<AllRedemptions />} />
          <Route path="/all_activities" element={<AllActivities />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
