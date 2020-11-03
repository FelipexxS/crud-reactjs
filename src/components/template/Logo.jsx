import './Logo.css';
import LogoImg from '../../assets/images/logo.png';
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () =>
    <aside className="logo">
        <Link exact to="/" className="logo">
            <img src={LogoImg} alt="logo" />
        </Link>
    </aside>

export default Logo;