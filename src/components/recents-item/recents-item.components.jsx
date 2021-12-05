import React from "react";

import './recents-item.styles.scss'

const RecentsItem = ({ imgUrl, name }) => (
  <div className='recents-item'>
    <img
      src={imgUrl}
      className='badge'
      alt='album art'
    />
    <h3 className='track-name'>{name}</h3>
    <button>P</button>
  </div>
)

export default RecentsItem;