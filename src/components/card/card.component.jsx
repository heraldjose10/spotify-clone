import React from "react";

import PlayButton from "../play-button/play-button.component";

import './card.styles.scss'

const Card = ({ imageUrl, name, artists, owner, playlist }) => (
  <div
    className='card'
  >
    <img
      className='card-image'
      src={imageUrl}
      alt='album art'
    />
    {
      playlist
        ? <div className={'button-container'}>
          <PlayButton />
        </div>
        : ''
    }
    <h4>
      {name.length > 20 ? `${name.substring(0, 20)}...` : name}
    </h4>
    {
      artists
        ? <p>
          {artists.map(artist =>
            ((artists.length - 1 === artists.indexOf(artist)) && artists.length > 1)
              ? `and ${artist.name}`
              : artist.name
          )}
        </p>
        : ''
    }
    {
      owner
        ? <p>{`By ${owner}`}</p>
        : ''
    }
  </div>
)

export default Card;