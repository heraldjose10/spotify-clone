import axios from "axios";
import React from "react";

import token from "../../env/token";
import Card from "../card/card.component";
import LikedSongsCard from "../liked-songs-card/liked-songs-card.component";

import './cards-grid.styles.scss'

class CardsGrid extends React.Component {
  constructor() {
    super()
    this.headers = { Authorization: `Bearer ${token}` }
    this.state = {
      playlists: []
      // add total likd ongs and latest liked songs list and render in liked songs carrd?!!
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/users/ndj8k9j6vld14if839zqsrf57/playlists',
      headers: this.headers
    })
      .then(response => this.setState({ playlists: response.data.items }))
  }

  render() {
    return (
      <div className='cards-grid'>
        <LikedSongsCard />
        {this.state.playlists.map((playlist) =>
          <Card
            key={playlist.id}
            imageUrl={playlist.images[0].url}
            name={playlist.name}
            owner={playlist.owner.display_name}
          />
        )}
      </div>
    )
  }
}

export default CardsGrid