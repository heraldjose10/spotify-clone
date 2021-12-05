import React from "react";

import SideBarBtnsGroup from "../side-bar-btns-group/side-bar-btns-group.component";
import SideBarNav from "../side-bar-nav/side-bar-nav.component";

import './side-bar.styles.scss'

const SideBar = () => (
  <div className='side-bar'>
    <SideBarNav />
    <SideBarBtnsGroup />
    <hr/>
  </div>
)

export default SideBar;