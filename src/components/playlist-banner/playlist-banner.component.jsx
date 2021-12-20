import React from "react";

import './playlist-banner.styles.scss'

const PlaylistBanner = ({ details }) => {

  if (details) {
    const { name, description, imageUrl, followers, createdBy, totalSongs } = details
    return (
      <div className='banner'>
        {
          imageUrl === 'liked'
            ? <div className='playlist-image'>
              <i className='bi bi-heart-fill'></i>
            </div>
            : <img className='playlist-image' alt='heart icon' src={imageUrl} />
        }
        <div className='playlist-info'>
          <p>PLAYLIST</p>
          <h1>{name}</h1>
          {
            description
              ? <p className='description'>{description}</p>
              : ''
          }
          <p>
            {
              `${createdBy} | ${totalSongs} songs${followers
                ? ` | ${followers} likes`
                : ''
              }`
            }
          </p>
        </div>
      </div>
    )
  }
  else {
    return (<h1>Loading</h1>)
  }
}

export default PlaylistBanner