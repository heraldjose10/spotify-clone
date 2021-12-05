import React from "react";
import axios from "axios";

import RecentsItem from "../recents-item/recents-item.components";

import token from '../../env/token'

import './recents-collection.styles.scss'

class RecentsCollection extends React.Component {

  constructor() {
    super();
    this.headers = { Authorization: `Bearer ${token}` }
    this.state = {
      recents: [],
      error: false
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me/player/recently-played',
      headers: this.headers,
      params: { limit: 8 }
    })
      .then((response) => this.setState({ recents: response.data.items }))
      .catch((error) => {
        this.setState({ error: true })
        console.log(error.response.data)
      })
  }

  render() {
    return (
      <div className='recents-collection'>
        {
          this.state.error ?
            <h1>error</h1>
            : this.state.recents.map(item => (
              <RecentsItem
                key={this.state.recents.indexOf(item)}
                imgUrl = {item.track.album.images[1].url}
                name = {item.track.name}
              />
            ))
        }
      </div>
    )
  }
}

export default RecentsCollection;