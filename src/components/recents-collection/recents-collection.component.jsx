import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { createStructuredSelector } from "reselect";

import RecentsItem from "../recents-item/recents-item.components";

import { fetchRecentTracksStartAsync } from "../../redux/player/player.actions";
import { selectCurrentUserToken } from "../../redux/user/user.selectors";
import { selectRecentTracksItems } from "../../redux/player/player.selectors";

import './recents-collection.styles.scss'


const RecentsCollection = ({ token, fetchRecentTracksStartAsync, recentTracks }) => {

  useEffect(() => {
    fetchRecentTracksStartAsync({ token })
  }, [fetchRecentTracksStartAsync, token])

  return (
    <div className='recents-collection'>
      {
        recentTracks.map((item, index) => (
          <RecentsItem
            key={index}
            track={item}
          />
        ))
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  token: selectCurrentUserToken,
  recentTracks: selectRecentTracksItems
})

const mapDispatchToProps = dispatch => ({
  fetchRecentTracksStartAsync: data => dispatch(fetchRecentTracksStartAsync(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentsCollection)