import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useEffect } from "react";
import { createStructuredSelector } from "reselect";

import RecentsItem from "../recents-item/recents-item.components";

import { setRecentTracks } from "../../redux/player/player.actions";
import { API_ENDPOINT } from "../../endpoints";
import { selectCurrentUserToken } from "../../redux/user/user.selectors";
import { selectRecentTracks } from "../../redux/player/player.selectors";

import './recents-collection.styles.scss'


const RecentsCollection = ({ token, setRecentTracks, recentTracks }) => {

  useEffect(() => {
    const getRecentSongs = async () => {
      let response = await axios.get(`${API_ENDPOINT}me/player/recently-played`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 8 }
      })
      setRecentTracks(response.data.items)
    }
    getRecentSongs()
  }, [setRecentTracks, token])

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

const mapStateToProps = createStructuredSelector({
  token: selectCurrentUserToken,
  recentTracks: selectRecentTracks
})

const mapDispatchToProps = dispatch => ({
  setRecentTracks: (tracks) => dispatch(setRecentTracks(tracks))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentsCollection)