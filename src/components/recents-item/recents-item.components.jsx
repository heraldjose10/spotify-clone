import React from "react";
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";

import { selectNowPlaying, selectPlayerIsPlaying } from "../../redux/player/player.selectors";
import { setNowPlaying, pauseTrack } from '../../redux/player/player.actions'

import PlayButton from "../play-button/play-button.component";

import './recents-item.styles.scss'

const RecentsItem = ({ track, setNowPlaying, nowPlaying, pauseTrack, isPlaying }) => {
  return (
    <div className='recents-item'>
      <img
        src={track.album.images[1].url}
        className='badge'
        alt='album art'
      />
      <h3 className='track-name'>{track.name.length < 20 ? track.name : `${track.name.substring(0, 30)}...`}</h3>
      <div
        onClick={
          () => (track.uri === nowPlaying?.uri) && (isPlaying === true) ? pauseTrack() : setNowPlaying(track)
        }
      >
        <PlayButton
          playing={(track.uri === nowPlaying?.uri) && (isPlaying === true) ? true : false}
        />
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  nowPlaying: selectNowPlaying,
  isPlaying: selectPlayerIsPlaying
})

const mapDispatchToProps = (dispatch) => ({
  pauseTrack: () => dispatch(pauseTrack()),
  setNowPlaying: (track) => dispatch(setNowPlaying(track))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentsItem);