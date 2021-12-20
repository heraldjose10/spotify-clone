import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import PlayButton from '../play-button/play-button.component'

import { setLikedSongs } from "../../redux/liked/liked.actions";
import { API_ENDPOINT } from "../../endpoints";

import './liked-songs-card.styles.scss'


const LikedSongsCard = ({ likedTracks, likedDetails, setLikedSongs, token, display_name }) => {

  useEffect(() => {
    if (likedTracks.length === 0) {
      const getLikedSongs = () => {
        axios({
          method: 'get',
          headers: {
            'Access-Control-Allow-Headers': '*',
            Authentication: `Bearer ${token}`,
          },
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
        console.log('working');
      }
      getLikedSongs()
    }
  }, [token, display_name, setLikedSongs, likedTracks.length])

  return (
    <div className='liked-songs-card'>
      <p>
        {
          likedTracks
            .filter((ele, index) => index < 8)
            .map((song) => `${song.track.name} | `)
        }
      </p>
      <h4>Liked Songs</h4>
      <p>{`${likedDetails.totalSongs ? likedDetails.totalSongs : ''} liked songs`}</p>
      <div className='button-container'>
        <PlayButton className='button'></PlayButton>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  likedTracks: state.liked.songs.tracks,
  likedDetails: state.liked.songs.details,
  display_name: state.user.currentUser.display_name,
  token: state.user.currentUser.token
})

const mapDispatchToProps = dispatch => ({
  setLikedSongs: likedSongs => dispatch(setLikedSongs(likedSongs))
})

export default connect(mapStateToProps, mapDispatchToProps)(LikedSongsCard)