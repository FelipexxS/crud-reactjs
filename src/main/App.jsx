import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Logo from '../components/template/Logo';
import Nav from '../components/template/Nav';
import Routes from '../main/Routes';
import Footer from '../components/template/Footer';

const App = () =>
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes />
            <Footer />
        </div>
    </BrowserRouter>


export default App;