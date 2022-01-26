import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import TracksList from "../tracks-list/tracks-list.component";

import { API_ENDPOINT } from "../../endpoints";
import { setLikedSongs } from "../../redux/liked/liked.actions";
import { removeViewingPlaylist, setViewingPlaylist } from "../../redux/playlist/playlist.actions";
import { selectCurrentUserDisplayName, selectCurrentUserToken } from "../../redux/user/user.selectors";
import { selectLikedDetails, selectLikedTracks } from "../../redux/liked/liked.selectors";
import { selectViewingPlaylistDetails, selectViewingPlaylistTracks } from "../../redux/playlist/playlist.selectors";

import './playlist.styles.scss'
import Banner from "../banner/banner.component";

const Playlist = ({
  liked,
  token,
  setLikedSongs,
  setViewingPlaylist,
  removeViewingPlaylist,
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
              albumArtURL: response.data.images[0].url,
              createdBy: response.data.owner.display_name,
              total: response.data.tracks.total,
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

    return () => removeViewingPlaylist()
  }, [playlistId, liked, setLikedSongs, token, setViewingPlaylist, display_name, removeViewingPlaylist])

  return (
    <div className="playlist">
      <Banner {...playlistDetails} type={'playlist'} />
      <TracksList tracks={liked ? likedTracks : playlistTracks} type={'playlist'} />
    </div>
  )
}

// why take likedTracks from redux store?!! Need FIX!
const mapStateToProps = createStructuredSelector({
  token: selectCurrentUserToken,
  likedTracks: selectLikedTracks,
  playlistTracks: selectViewingPlaylistTracks,
  playlistDetails: selectViewingPlaylistDetails,
  likedDetails: selectLikedDetails,
  display_name: selectCurrentUserDisplayName
})

const mapDispatchToProps = dispatch => ({
  setLikedSongs: likedSongs => dispatch(setLikedSongs(likedSongs)),
  setViewingPlaylist: viewingPlaylist => dispatch(setViewingPlaylist(viewingPlaylist)),
  removeViewingPlaylist: () => dispatch(removeViewingPlaylist())
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);