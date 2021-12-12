import React from "react";
import { useParams } from "react-router";

import PlaylistBanner from "../../components/playlist-banner/playlist-banner.component";

import './playlist.styles.scss'

const Playlist = () => {
  const { playlistId } = useParams();

  return (
    <div className='playlist'>
      <PlaylistBanner playlistId={playlistId} />
    </div>
  )
}

export default Playlist