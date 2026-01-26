
import './App.css'
import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/Homepage.jsx';
import AboutPage from './pages/Aboutpage.jsx';
import ProblemsPage from './pages/Problemspage.jsx';
import { useUser } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';

function App() {
 
 const {isSignedIn}=useUser();
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />} />
    </Routes>
      
      <Toaster position="top-left" toastOptions={{duration:3000}}/>
    </>
  )
}

export default App

//tw, daisyui, react-router , react-hot-toast
//todo: react-query, aka tanstack query, axios
// can use better comment extension which is use for better visibility of commentss