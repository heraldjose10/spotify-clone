import axios from "axios";
import React from "react";

import Card from "../card/card.component";

import token from "../../env/token";

import './cards-group.styles.scss'

class CardsGroup extends React.Component {

  constructor() {
    super()
    this.headers = { Authorization: `Bearer ${token}` }
    this.state = {
      albums: []
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/browse/new-releases',
      headers: this.headers
    })
      .then(response => this.setState({ albums: response.data.albums.items }))
  }

  render() {
    return (
      <div className='group'>
        <h2 className='group-heading'>Hot new releases</h2>
        <div className='cards-container'>
          {
            this.state.albums
              .filter((value, index) => index <= 4)
              .map(album =>
                <Card name={album.name} imageUrl={album.images[1].url} artists={album.artists} />
              )
          }
        </div>
      </div>
    )
  }
}

export default CardsGroup;