import React from "react";
import { Link } from "react-router-dom";

import './nav-item.styles.scss'

const NavItem = ({ name, iconUrl, to }) => (
  <Link to={to} className='nav-item'>
    <img src={iconUrl} />
    <h3>{name}</h3>
  </Link>
)

export default NavItem;