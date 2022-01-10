import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import PlayButton from '../play-button/play-button.component'

import { setLikedSongs } from "../../redux/liked/liked.actions";
import { selectLikedDetails, selectLikedTracks } from "../../redux/liked/liked.selectors";
import { selectCurrentUserDisplayName, selectCurrentUserToken } from "../../redux/user/user.selectors";
import { API_ENDPOINT } from "../../endpoints";

import './liked-songs-card.styles.scss'


const LikedSongsCard = ({ likedTracks, likedDetails, setLikedSongs, token, displayName }) => {

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
                createdBy: displayName
              }
            })
          })
          .catch(error => console.log(error))
      }
      getLikedSongs()
    }
  }, [token, displayName, setLikedSongs, likedTracks.length])

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


const mapStateToProps = createStructuredSelector({
  likedTracks: selectLikedTracks,
  likedDetails: selectLikedDetails,
  displayName: selectCurrentUserDisplayName,
  token: selectCurrentUserToken
})

const mapDispatchToProps = dispatch => ({
  setLikedSongs: likedSongs => dispatch(setLikedSongs(likedSongs))
})

export default connect(mapStateToProps, mapDispatchToProps)(LikedSongsCard)