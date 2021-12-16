import './track.styles.scss'

const Track = ({ track }) => {
  console.log(track.track.album.images[2].url)
  return (
    <div className='track'>
      <div className='name cols'>
        <img src={track.track.album.images[2].url} alt='album-art'/>
        <span>{track.track.name}</span>
      </div>
      <span className='album cols'>{track.track.album.name}</span>
      <span className='added cols'>{track.added_at}</span>
      <span className='duration cols'>{track.track.duration_ms}</span>
    </div>
  )
}

export default Track;