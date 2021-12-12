import axios from "axios";
import React from "react";

import token from "../../env/token";

import './playlist-banner.styles.scss'

class PlaylistBanner extends React.Component {

  constructor() {
    super()
    this.headers = { Authorization: `Bearer ${token}` }
    this.state = {
      name: '',
      iamgeUrl: '',
      createdBy: '',
      totalSongs: '',
      description: '',
      followers: ''
    }
  }

  fetchPlaylistInfo = () => {
    if (this.props.playlistId === 'liked') {
      this.setState({
        playlistId: 'liked',
        name: 'Liked Songs',
        imageUrl: 'liked',
        createdBy: 'Heraldjos',
        totalSongs: 359
      })
    }
    else {
      axios({
        method: 'get',
        headers: this.headers,
        url: `https://api.spotify.com/v1/playlists/${this.props.playlistId}`
      })
        .then(response => this.setState({
          playlistId: this.props.playlistId,
          name: response.data.name,
          imageUrl: response.data.images[0].url,
          createdBy: response.data.owner.display_name,
          totalSongs: response.data.tracks.total,
          description: response.data.description,
          followers: response.data.followers.total
        }))
        .catch(error => console.log(error))
    }
  }

  componentDidMount() {
    this.fetchPlaylistInfo()
  }

  componentDidUpdate() {
    if (this.props.playlistId !== this.state.playlistId) {
      this.fetchPlaylistInfo()
    }
  }

  render() {
    return (
      <div className='banner'>
        {
          this.state.imageUrl === 'liked'
            ? <div className='playlist-image'>
              <i className='bi bi-heart-fill'></i>
            </div>
            : <img className='playlist-image' alt='heart icon' src={this.state.imageUrl} />
        }
        <div className='playlist-info'>
          <p>PLAYLIST</p>
          <h1>{this.state.name}</h1>
          {
            this.state.description
              ? <p className='description'>{this.state.description}</p>
              : ''
          }
          <p>
            {
              `${this.state.createdBy} | ${this.state.totalSongs} songs${this.state.followers
                ? ` | ${this.state.followers} likes`
                : ''
              }`
            }
          </p>
        </div>
      </div>
    )
  }
}

export default PlaylistBanner