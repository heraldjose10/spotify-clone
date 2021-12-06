import React from "react";

import SideBarBtnsGroup from "../side-bar-btns-group/side-bar-btns-group.component";
import SideBarNav from "../side-bar-nav/side-bar-nav.component";
import SideBarPlaylistsList from "../sidebar-playlists-list/sidebar-playlists-list.component";

import './side-bar.styles.scss'

const SideBar = () => (
  <div className='side-bar'>
    <SideBarNav />
    <SideBarBtnsGroup />
    <hr />
    <SideBarPlaylistsList />
  </div>
)

export default SideBar;