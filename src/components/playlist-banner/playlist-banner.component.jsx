import React from "react";

import './playlist-banner.styles.scss'

const PlaylistBanner = ({ playlistDetails }) => {
  const { name, description, imageUrl, followers, createdBy, totalSongs } = playlistDetails

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
export default PlaylistBanner