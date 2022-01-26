import React from "react";
import { Outlet } from "react-router-dom";

import './album-page.styles.scss'

const AlbumPage = () => {
  return (
    <div className="album-name">
      <Outlet />
    </div>
  )
}

export default AlbumPage;