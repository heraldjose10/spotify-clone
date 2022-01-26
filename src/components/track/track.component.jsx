import { connect } from 'react-redux'
import Moment from 'react-moment';
import moment from 'moment'
import { Link } from 'react-router-dom';

import { setNowPlaying } from '../../redux/player/player.actions'

import './track.styles.scss'

const Track = ({ track, setNowPlaying }) => {

  const convertToRuntime = (timeInMilliseconds) => {
    const duration = moment.duration(timeInMilliseconds)
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
  }

  const stopBubbling = (e) => {
    e.stopPropagation()
  }

  return (
    <div
      className='track'
      onClick={() => {
        setNowPlaying(track)
      }}
    >
      <div className='name cols'>
        {
          track.album ? <img src={track.album.images[2].url} alt='album-art' /> : ''
        }
        <span>{track.name}</span>
      </div>
      {
        track.album
          ? (
            <Link
              to={`/album/${track.album.id}`}
              className='album cols'
              onClick={stopBubbling}
            >
              <span >{track.album.name}</span>
            </Link>
          )
          : ''
      }
      {
        track.album
          ? ''
          : ''
      }
      {
        track.album
          ? (
            <span className='added cols'>
              <Moment fromNow>{track.added_at}</Moment>
            </span>
          )
          : ''
      }
      <span className='duration cols'>{convertToRuntime(track.duration_ms)}</span>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setNowPlaying: track => dispatch(setNowPlaying(track))
})

export default connect(null, mapDispatchToProps)(Track);