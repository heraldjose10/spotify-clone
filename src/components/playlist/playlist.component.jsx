import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import PlaylistBanner from '../playlist-banner/playlist-banner.component'
import token from "../../env/token";

import './playlist.styles.scss'
import TracksList from "../tracks-list/tracks-list.component";

const Playlist = ({ likedSongs }) => {

  const { playlistId } = useParams()

  const [playlistDetails, setPlaylistDetails] = useState({})
  const [playlistTracks, setPlaylistTracks] = useState({ tracks: [] })

  useEffect(() => {
    const fetchPlaylistInfo = () => {
      if (likedSongs) {
        setPlaylistDetails({
          id: 'liked',
          name: 'Liked Songs',
          imageUrl: 'liked',
          createdBy: 'Heraldjos',
          totalSongs: 359
        })
      }
      else {
        axios({
          method: 'get',
          headers: { Authorization: `Bearer ${token}` },
          url: `https://api.spotify.com/v1/playlists/${playlistId}`
        })
          .then(response => {
            setPlaylistDetails({
              id: response.data.id,
              name: response.data.name,
              imageUrl: response.data.images[0].url,
              createdBy: response.data.owner.display_name,
              totalSongs: response.data.tracks.total,
              description: response.data.description,
              followers: response.data.followers.total,
            })
            setPlaylistTracks({
              tracks: response.data.tracks.items
            })
          })
          .catch(error => console.log(error))
      }
    }
    fetchPlaylistInfo()
  }, [playlistId, likedSongs])

  return (
    <div className="playlist">
      <PlaylistBanner playlistDetails={playlistDetails} />
      <TracksList tracks={playlistTracks.tracks} />
    </div>
  )
}

export default Playlist;