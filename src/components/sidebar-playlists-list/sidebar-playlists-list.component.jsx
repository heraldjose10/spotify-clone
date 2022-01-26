import { connect } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { createStructuredSelector } from "reselect";

import { setCurrentUserPlaylists } from "../../redux/user/user.actions";
import { API_ENDPOINT } from "../../endpoints";
import { selectCurrentUserId, selectCurrentUserToken } from "../../redux/user/user.selectors";
import { selectCurrentUserPlaylists } from "../../redux/user/user.selectors";

import './sidebar-playlists-list.styles.scss'


const SideBarPlaylistsList = ({ playlists, setPlaylists, token, userId }) => {

  useEffect(() => {
    const getUserPlaylists = async (userId, userToken) => {
      let response = await axios(`${API_ENDPOINT}users/${userId}/playlists`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      setPlaylists(response.data.items)
    }
    getUserPlaylists(userId, token)
  }, [userId, token, setPlaylists])

  return (
    <div className='list'>
      {
        playlists ?
          playlists.map((playlist) =>
            <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
              <h3>
                {playlist.name.length > 30 ? `${playlist.name.substring(0, 30)}...` : playlist.name}
              </h3>
            </Link>
          )
          : ''
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  playlists: selectCurrentUserPlaylists,
  token: selectCurrentUserToken,
  userId: selectCurrentUserId
})

const mapDispatchToProps = dispatch => ({
  setPlaylists: playlists => dispatch(setCurrentUserPlaylists(playlists))
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBarPlaylistsList);