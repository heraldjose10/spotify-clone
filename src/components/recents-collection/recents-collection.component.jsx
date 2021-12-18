import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useEffect } from "react";

import RecentsItem from "../recents-item/recents-item.components";

import { setRecentTracks } from "../../redux/player/player.actions";
import { API_ENDPOINT } from "../../endpoints";

import './recents-collection.styles.scss'


const RecentsCollection = ({ currentUser, setRecentTracks, recentTracks }) => {

  const getRecentSongs = async () => {
    let response = await axios.get(`${API_ENDPOINT}me/player/recently-played`, {
      headers: { Authorization: `Bearer ${currentUser.token}` },
      params: { limit: 8 }
    })
    setRecentTracks(response.data.items)
  }

  useEffect(() => {
    if (recentTracks.length === 0) {
      // update tracks if recent tracks array is empty
      getRecentSongs()
    }
  })

  return (
    <div className='recents-collection'>
      {
        recentTracks.map(item => (
          <RecentsItem
            key={recentTracks.indexOf(item)}
            imgUrl={item.track.album.images[1].url}
            name={item.track.name}
          />
        ))
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  recentTracks: state.player.recentTracks
})

const mapDispatchToProps = dispatch => ({
  setRecentTracks: (tracks) => dispatch(setRecentTracks(tracks))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentsCollection)