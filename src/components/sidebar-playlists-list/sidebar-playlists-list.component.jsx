import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

import './sidebar-playlists-list.styles.scss'


const SideBarPlaylistsList = ({ playlists }) => {
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
  playlists: state.playlist.playlists
})

export default connect(mapStateToProps)(SideBarPlaylistsList);