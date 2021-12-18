import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

import token from "../../env/token";

import './sidebar-playlists-list.styles.scss'

class SideBarPlaylistsList extends React.Component {
  constructor() {
    super()
    this.headers = { Authorization: `Bearer ${token}` }
    this.state = {
      playlists: []
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/users/ndj8k9j6vld14if839zqsrf57/playlists',
      headers: this.headers
    })
      .then(response => this.setState({ playlists: response.data.items }))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className='list'>
        {
          this.state.playlists.map((playlist) =>
            <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
              <h3>
                {playlist.name.length > 30 ? `${playlist.name.substring(0, 30)}...` : playlist.name}
              </h3>
            </Link>
          )
        }
      </div>
    )
  }
}

export default SideBarPlaylistsList;