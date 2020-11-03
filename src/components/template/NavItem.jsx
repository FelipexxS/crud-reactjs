import React from "react";
import { NavLink } from 'react-router-dom';

// Se o link for exato, a função NavItem retornará o primeiro componente 
const NavItem = ({ link, navIcon, itemName, isExact }) =>
    isExact ? (
        <NavLink exact to={link} activeClassName="selectedItem">
            <i className={navIcon} /> <span>{itemName}</span>
        </NavLink>
    ) : (
        <NavLink to={link} activeClassName="selectedItem">
            <i className={navIcon} /> <span>{itemName}</span>
        </NavLink>
    )

export default NavItem;