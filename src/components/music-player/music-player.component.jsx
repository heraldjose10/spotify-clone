import { useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import SpotifyWebPlayer from "react-spotify-web-playback/lib"

import { selectNowPlaying, selectPlayerIsPlaying } from "../../redux/player/player.selectors"
import { selectCurrentUserToken } from "../../redux/user/user.selectors"
import { playTrack, pauseTrack } from "../../redux/player/player.actions"

import './music-player.styles.scss'

function MusicPlayer({ token, nowPlaying, playStatus, playTrack, pauseTrack }) {

  useEffect(() => {
    if (nowPlaying?.uri) {
      playTrack()
    }
  }, [nowPlaying, playTrack])
  return (
    <div className="player">
      <SpotifyWebPlayer
        token={token}
        uris={nowPlaying ? [nowPlaying.uri] : null}
        play={playStatus}
        showSaveIcon={true}
        magnifySliderOnHover={true}
        name="Spotify-Clone"
        callback={
          state => {
            if (state.isPlaying === true && playStatus === false) {
              playTrack()
            }
            else if (playStatus === true && state.isPlaying === false) {
              pauseTrack()
            }
          }
        }
        syncExternalDeviceInterval={1}
        persistDeviceSelection={true}
        syncExternalDevice={true}
        styles={{
          bgColor: '#1a1f1b',
          color: '#fff',
          trackNameColor: '#fff',
          trackArtistColor: '#fff',
          sliderHandleColor: '#2c3632',
          activeColor: '#fff'
        }}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  playStatus: selectPlayerIsPlaying,
  token: selectCurrentUserToken,
  nowPlaying: selectNowPlaying,
})

const mapDispatchToProps = dispatch => ({
  playTrack: () => dispatch(playTrack()),
  pauseTrack: () => dispatch(pauseTrack())
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer)
