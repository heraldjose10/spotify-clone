import { connect } from "react-redux"
import SpotifyWebPlayer from "react-spotify-web-playback/lib"

import { playTrack } from "../../redux/player/player.actions"

import './music-player.styles.scss'

function MusicPlayer({ token, nowPlaying, playStatus, playTrack }) {
  return (
    <div className="player">
      <SpotifyWebPlayer
        token={token}
        uris={[nowPlaying.uri]}
        play={playStatus}
        showSaveIcon={true}
        magnifySliderOnHover={true}
        callback={(state) => state.isPlaying ? '' : playTrack(state.isPlaying)}
        styles={{
          bgColor: '#1a1f1b',
          color: '#fff',
          trackNameColor: '#fff',
          trackArtistColor: '#fff',
          sliderHandleColor: '#2c3632',
          activeColor: '#fff'
        }}
        autoPlay={true}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  playStatus: state.player.isPlaying,
  token: state.user.currentUser.token
})

const mapDispatchToProps = dispatch => ({
  playTrack: (playStatus) => dispatch(playTrack(playStatus))
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer)
