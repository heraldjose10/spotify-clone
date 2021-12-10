import axios from "axios";
import React from "react";

import PlayButton from '../play-button/play-button.component'

import token from "../../env/token";

import './liked-songs-card.styles.scss'

class LikedSongsCard extends React.Component {

  constructor() {
    super()
    this.headers = { Authorization: `Bearer ${token}` }
    this.state = {
      likedSongs: [],
      numberOfLikedSongs: ''
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me/tracks',
      headers: this.headers
    })
      .then(response => {
        this.setState({
          likedSongs: response.data.items,
          numberOfLikedSongs: response.data.total
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='liked-songs-card'>
        <p>
          {
            this.state.likedSongs
              .filter((ele, index) => index < 8)
              .map((song) => `${song.track.name} | `)
          }
        </p>
        <h4>Liked Songs</h4>
        <p>{`${this.state.numberOfLikedSongs} liked songs`}</p>
        <div className='button-container'>
          <PlayButton className='button'></PlayButton>
        </div>
      </div>
    )
  }
}

export default LikedSongsCard