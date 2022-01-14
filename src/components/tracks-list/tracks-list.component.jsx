import Track from '../track/track.component'

import './tracks-list.styles.scss'

const TracksList = ({ tracks }) => {
  return (
    <div className='tracks-list'>
      <div className='list-header'>
        <span className='name heading'>title</span>
        <span className='album heading'>album</span>
        <span className='date heading'>date added</span>
        <span className='duration heading'>time</span>
      </div>
      {
        tracks.map(track =>
          <Track track={track} key={track.track.id}/>
        )
      }
    </div>
  )
}

export default TracksList