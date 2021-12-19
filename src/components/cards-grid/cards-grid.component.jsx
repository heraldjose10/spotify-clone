import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";

import { API_ENDPOINT } from "../../endpoints";
import { setPlaylists } from "../../redux/playlist/playlist.actions";

import Card from "../card/card.component";
import LikedSongsCard from "../liked-songs-card/liked-songs-card.component";

import './cards-grid.styles.scss'

const CardsGrid = ({ token, userId, playlists, setPlaylists }) => {

  useEffect(() => {

    async function getUserPlaylists(userId, userToken) {
      let response = await axios(`${API_ENDPOINT}users/${userId}/playlists`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      setPlaylists(response.data.items)
    }
    
    getUserPlaylists(userId, token)
  }, [userId, token, setPlaylists])

  return (
    <div className='cards-grid'>
      <Link to='/playlist/liked' className="liked">
        <LikedSongsCard />
      </Link>
      {playlists.map((playlist) =>
        <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
          <Card
            imageUrl={playlist.images[0].url}
            name={playlist.name}
            owner={playlist.owner.display_name}
          />
        </Link>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  token: state.user.currentUser.token,
  userId: state.user.currentUser.id,
  playlists: state.playlist.playlists
})

const mapDispatchToProps = dispatch => ({
  setPlaylists: (playlists) => dispatch(setPlaylists(playlists))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardsGrid)