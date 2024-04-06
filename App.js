import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Game from './components/pages/Game';

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/ailearntsite' element={<Home />} />
                    <Route path='/services' element={<Game />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/sign-up' element={<SignUp />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;