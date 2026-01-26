
import './App.css'
import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/Homepage.jsx';
import AboutPage from './pages/Aboutpage.jsx';
import ProblemsPage from './pages/Problemspage.jsx';
import DasboardPage from './pages/Dashboardpage.jsx';
import { useUser } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';

function App() {
 
 const {isSignedIn, isLoaded}=useUser();

 //this will prevent flicker effect why -> because it waits for the user state to load before rendering any routes
if(!isLoaded) return null;

  return (
    <>
    <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isSignedIn ? <DasboardPage /> : <Navigate to="/" />} />
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