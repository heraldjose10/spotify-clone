import React from "react";

import PlayButton from "../play-button/play-button.component";

import './recents-item.styles.scss'

const RecentsItem = ({ imgUrl, name }) => (
  <div className='recents-item'>
    <img
      src={imgUrl}
      className='badge'
      alt='album art'
    />
    <h3 className='track-name'>{name.length < 20 ? name :`${name.substring(0,30)}...`}</h3>
    <PlayButton />
  </div>
)

export default RecentsItem;