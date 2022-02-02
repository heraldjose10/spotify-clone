import { useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import SpotifyWebPlayer from "react-spotify-web-playback/lib"

import { selectNowPlaying, selectPlayerIsPlaying } from "../../redux/player/player.selectors"
import { selectCurrentUserToken } from "../../redux/user/user.selectors"
import { playTrack, pauseTrack } from "../../redux/player/player.actions"

import './music-player.styles.scss'

function MusicPlayer({ token, nowPlaying, playStatus, playTrack, pauseTrack }) {

  useEffect(() => playTrack(true), [nowPlaying, playTrack])

  return (
    <div className="player">
      <SpotifyWebPlayer
        token={token}
        uris={[nowPlaying.uri]}
        play={playStatus}
        showSaveIcon={true}
        magnifySliderOnHover={true}
        name="Spotify-Clone"
        callback={
          state => state.isPlaying === true ? playTrack() : pauseTrack()
        }
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
  nowPlaying: selectNowPlaying
})

const mapDispatchToProps = dispatch => ({
  playTrack: () => dispatch(playTrack()),
  pauseTrack: () => dispatch(pauseTrack())
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer)
