import { connect } from 'react-redux'
import Moment from 'react-moment';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { setNowPlaying, setPlayQueue } from '../../redux/player/player.actions'

import './track.styles.scss'
import { selectCollectionItems } from '../../redux/collection/collection.selectors';

const Track = ({ track, setNowPlaying, setPlayQueue, collectionItems }) => {

  const convertToRuntime = (timeInMilliseconds) => {
    const duration = moment.duration(timeInMilliseconds)
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
  }

  const stopBubbling = (e) => {
    e.stopPropagation()
  }

  const handleClick = () => {
    setNowPlaying(track)
    let indexOfTrack = collectionItems
      .map(item => item.uri)
      .indexOf(track.uri)
    setPlayQueue(collectionItems.slice(indexOfTrack + 1));
  }

  return (
    <div
      className='track'
      onClick={handleClick}
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
          : (
            <span className='artists cols'>
              {
                track.artists && track.artists.map(artist =>
                  artist.name
                )
                  .join(' + ')
              }
            </span>
          )
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

const mapStateToProps = createStructuredSelector({
  collectionItems: selectCollectionItems
})

const mapDispatchToProps = dispatch => ({
  setNowPlaying: track => dispatch(setNowPlaying(track)),
  setPlayQueue: track => dispatch(setPlayQueue(track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Track);