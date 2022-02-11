import React from "react";

import './banner.styles.scss'

const Banner = ({
  name,
  albumArtURL,
  type,
  artists,
  total,
  releaseDate,
  description,
  followers,
  createdBy
}) => {

  const artistsString = type === 'album'
    ? artists.map(artist => artist.name).join(' + ')
    : ''

  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : null

  return (
    <div className='banner'>
      {
        albumArtURL
          ? <img className='playlist-image' alt='heart icon' src={albumArtURL} />
          : <div className='playlist-image'>
            <i className='bi bi-heart-fill'></i>
          </div>
      }
      <div className='playlist-info'>
        <p>{type.toUpperCase()}</p>
        <h1>{name}</h1>
        {
          description
            ? <p className='description'>{description}</p>
            : ''
        }
        <p className="description">
          {
            `
            ${artistsString}
            ${createdBy ? createdBy : ''}
            | ${total} songs
            ${releaseYear ? `| ${releaseYear}` : ''}
            ${followers ? ` | ${followers} likes` : ''}
            `
          }
        </p>
      </div>
    </div>
  )
}

export default Banner;