import './Nav.css';
import React from 'react';

import NavItem from './NavItem';

const Nav = () =>
    <aside className="menu-area">
        <nav className="menu">
            <NavItem link="/" navIcon="fa fa-home" itemName="Início" isExact />
            <NavItem link="/users" navIcon="fa fa-users" itemName="Usuários" />
        </nav>
    </aside>

export default Nav;