import { connect } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { setPlaylists } from "../../redux/playlist/playlist.actions";
import { API_ENDPOINT } from "../../endpoints";

import './sidebar-playlists-list.styles.scss'


const SideBarPlaylistsList = ({ playlists, setPlaylists, token, userId }) => {

  useEffect(() => {
    if (playlists.length === 0) {
      const getUserPlaylists = async (userId, userToken) => {
        let response = await axios(`${API_ENDPOINT}users/${userId}/playlists`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        setPlaylists(response.data.items)
      }
      getUserPlaylists(userId, token)
    }
  }, [playlists, userId, token, setPlaylists])

  return (
    <div className='list'>
      {
        playlists.map((playlist) =>
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

const mapStateToProps = state => ({
  playlists: state.playlist.playlists,
  token: state.user.currentUser.token,
  userId: state.user.currentUser.id
})

const mapDispatchToProps = dispatch => ({
  setPlaylists: playlists => dispatch(setPlaylists(playlists))
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBarPlaylistsList);