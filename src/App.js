import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import InstantConsultation from './components/InstantConsultation/InstantConsultation';
import BookAppointment from './components/BookAppointment/BookAppointment';
import ReviewForm from './components/ReviewForm/ReviewForm';
import Notification from './components/Notification/Notification';
import ProfilePage from './components/ProfileCard/ProfilePage/ProfilePage';
import ReportsPage from './components/ProfileCard/ReportsPage/ReportsPage';

function App() {
  return (
    <div className='app-wrapper'>
        <BrowserRouter> {/* Set up BrowserRouter for routing */}
            <Navbar/>
            <Routes> {/* Set up the Routes for different pages */}
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/instant-consultation' element={<InstantConsultation />} />
                <Route path='/appointments' element={<BookAppointment />} />
                <Route path='/reviews' element={<ReviewForm />} />
                <Route path='/log-in' element={<LogIn/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/reports' element={<ReportsPage/>}/>
            </Routes>
            <Notification />
        </BrowserRouter>
    </div>
  );
}

export default App;