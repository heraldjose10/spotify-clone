import { connect } from "react-redux";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { fetchUserPlaylistsStartAsync } from "../../redux/user/user.actions";
import { selectCurrentUserId, selectCurrentUserToken } from "../../redux/user/user.selectors";
import { selectUserPlaylistsItems } from "../../redux/user/user.selectors";

import './sidebar-playlists-list.styles.scss'


const SideBarPlaylistsList = ({ playlists, fetchUserPlaylistsStartAsync, token, userId }) => {

  useEffect(() => {
    fetchUserPlaylistsStartAsync({token, userId})
  }, [token, userId, fetchUserPlaylistsStartAsync])

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
  playlists: selectUserPlaylistsItems,
  token: selectCurrentUserToken,
  userId: selectCurrentUserId
})

const mapDispatchToProps = dispatch => ({
  fetchUserPlaylistsStartAsync: (credentials) => dispatch(fetchUserPlaylistsStartAsync(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBarPlaylistsList);