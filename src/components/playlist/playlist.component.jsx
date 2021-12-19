import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import PlaylistBanner from '../playlist-banner/playlist-banner.component'
import TracksList from "../tracks-list/tracks-list.component";

import { API_ENDPOINT } from "../../endpoints";
import { setLikedSongs } from "../../redux/liked/liked.actions";
import { setViewingPlaylist } from "../../redux/playlist/playlist.actions";

import './playlist.styles.scss'

const Playlist = ({
  liked,
  token,
  setLikedSongs,
  setViewingPlaylist,
  likedTracks,
  likedDetails,
  playlistTracks,
  playlistDetails,
  display_name }) => {

  const { playlistId } = useParams()

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` }
    const fetchPlaylistInfo = () => {
      axios({
        method: 'get',
        headers: headers,
        url: `${API_ENDPOINT}playlists/${playlistId}`
      })
        .then(response => {
          setViewingPlaylist({
            details: {
              id: response.data.id,
              name: response.data.name,
              imageUrl: response.data.images[0].url,
              createdBy: response.data.owner.display_name,
              totalSongs: response.data.tracks.total,
              description: response.data.description,
              followers: response.data.followers.total
            },
            tracks: response.data.tracks.items
          })
        })
        .catch(error => console.log(error))
    }

    const getLikedSongs = () => {
      axios({
        method: 'get',
        headers: headers,
        url: `${API_ENDPOINT}me/tracks`
      })
        .then(response => {
          setLikedSongs({
            tracks: response.data.items,
            details: {
              totalSongs: response.data.total,
              imageUrl: 'liked',
              createdBy: display_name
            }
          })
        })
        .catch(error => console.log(error))
    }

    if (liked) {
      getLikedSongs()
    }
    else {
      fetchPlaylistInfo()
    }
  }, [playlistId, liked, setLikedSongs, token, setViewingPlaylist, display_name])

  return (
    <div className="playlist">
      <PlaylistBanner details={liked ? likedDetails : playlistDetails} />
      <TracksList tracks={liked ? likedTracks : playlistTracks} />
    </div>
  )
}

const mapStateToProps = state => ({
  token: state.user.currentUser.token,
  likedTracks: state.liked.songs.tracks,
  playlistTracks: state.playlist.viewingPlaylist.tracks,
  playlistDetails: state.playlist.viewingPlaylist.details,
  likedDetails: state.liked.songs.details,
  display_name: state.user.currentUser.display_name
})

const mapDispatchToProps = dispatch => ({
  setLikedSongs: likedSongs => dispatch(setLikedSongs(likedSongs)),
  setViewingPlaylist: viewingPlaylist => dispatch(setViewingPlaylist(viewingPlaylist))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);