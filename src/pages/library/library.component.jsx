import React from "react";
import CardsGrid from "../../components/cards-grid/cards-grid.component";

import './library.styles.scss'

const Library = () => (
  <div className='library'>
    <h1>Playlists</h1>
    <CardsGrid/>
  </div>
)

export default Library