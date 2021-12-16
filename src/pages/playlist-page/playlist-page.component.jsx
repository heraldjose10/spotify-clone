import React from "react";
import { Outlet } from "react-router-dom";

import './playlist-page.styles.scss'

const PlaylistPage = () => {
  return (
    <div className='playlist-page'>
      <Outlet />
    </div>
  )
}

export default PlaylistPage