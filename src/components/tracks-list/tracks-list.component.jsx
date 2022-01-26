import Track from '../track/track.component'

import './tracks-list.styles.scss'

const TracksList = ({ tracks, type }) => {
  return (
    <div className='tracks-list'>
      <div className='list-header'>
        <span className='name heading'>title</span>
        {
          type === 'playlist' ? <span className='album heading'>album</span> : ''
        }
        {
          type === 'playlist' ? <span className='date heading'>date added</span> : ''
        }
        {
          type === 'album' ? <span className='artists heading'>artists</span> : ''
        }
        <span className='duration heading'>time</span>
      </div>
      {
        tracks.map(track =>
          <Track track={track} key={track.id} />
        )
      }
    </div>
  )
}

export default TracksList