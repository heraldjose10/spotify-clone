import { connect } from 'react-redux'

import { playTrack } from '../../redux/player/player.actions'
import { setNowPlaying } from '../../redux/player/player.actions'

import './track.styles.scss'

const Track = ({ track, playTrack, setNowPlaying }) => {
  return (
    <div
      className='track'
      onClick={() => {
        playTrack()
        setNowPlaying(track.track)
      }}
    >
      <div className='name cols'>
        <img src={track.track.album.images[2].url} alt='album-art' />
        <span>{track.track.name}</span>
      </div>
      <span className='album cols'>{track.track.album.name}</span>
      <span className='added cols'>{track.added_at}</span>
      <span className='duration cols'>{track.track.duration_ms}</span>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  playTrack: () => dispatch(playTrack()),
  setNowPlaying: track => dispatch(setNowPlaying(track))
})

export default connect(null, mapDispatchToProps)(Track);