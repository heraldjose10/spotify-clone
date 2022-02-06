import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectLikedTracks } from "../../redux/collection/collection.selectors";
import {
  selectCurrentUserDisplayName,
  selectCurrentUserToken
} from "../../redux/user/user.selectors";
import { fetchLikedTracksAsync, removeCOllection } from "../../redux/collection/collection.actions";

import PlayButton from '../play-button/play-button.component'

import './liked-songs-card.styles.scss'


const LikedSongsCard = ({ likedTracks, token, displayName, fetchLikedTracksAsync, removeCOllection }) => {

  useEffect(() => {
    fetchLikedTracksAsync({ token, displayName })
  }, [fetchLikedTracksAsync, token, displayName])

  useLayoutEffect(() => {
    return () => removeCOllection()
  }, [removeCOllection])

  return (
    <div className='liked-songs-card'>
      <p>
        {
          likedTracks.items
            .filter((ele, index) => index < 8)
            .map((song) => `${song.name} | `)
        }
      </p>
      <h4>Liked Songs</h4>
      <p>{`${likedTracks.details.total ? likedTracks.details.total : ''} liked songs`}</p>
      <div className='button-container'>
        <PlayButton className='button'></PlayButton>
      </div>
    </div>
  )
}


const mapStateToProps = createStructuredSelector({
  likedTracks: selectLikedTracks,
  displayName: selectCurrentUserDisplayName,
  token: selectCurrentUserToken
})

const mapDispatchToProps = dispatch => ({
  fetchLikedTracksAsync: data => dispatch(fetchLikedTracksAsync(data)),
  removeCOllection: () => dispatch(removeCOllection())
})

export default connect(mapStateToProps, mapDispatchToProps)(LikedSongsCard)