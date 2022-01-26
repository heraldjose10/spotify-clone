import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { API_ENDPOINT } from "../../endpoints";
import { selectCurrentUserToken } from "../../redux/user/user.selectors";
import { setAlbum, removeAlbum } from "../../redux/collection/collection.actions";
import { selectAlbum, selectPlaylist } from "../../redux/collection/collection.selectors";

import Banner from "../banner/banner.component";

import './collection.styles.scss'
import TracksList from "../tracks-list/tracks-list.component";

const Collection = ({ token, collectionType, setAlbum, album, playlist, removeAlbum }) => {

  const params = useParams()
  const id = params[`${collectionType}id`]

  useEffect(() => {
    const fetchCollection = () => {
      const headers = { Authorization: `Bearer ${token}` }
      axios({
        method: 'get',
        headers: headers,
        url: `${API_ENDPOINT}${collectionType}s/${id}`
      })
        .then(response => {
          setAlbum({
            items: response.data.tracks.items,
            details: {
              albumArtURL: response.data.images.length > 0 ? response.data.images[0].url : null,
              type: response.data.type,
              name: response.data.name,
              artists: response.data.artists,
              total: response.data.tracks.total,
              releaseDate: response.data.release_date
            }
          })
        })
        .catch(error => {
          console.log(error);
        })
    }
    fetchCollection()
    return () => removeAlbum()
  }, [collectionType, id, token, setAlbum])

  const collection = collectionType == 'album' ? album : playlist

  return (
    <Fragment>
      {
        Object.keys(collection.details).length > 0
          ? <Banner {...collection.details} />
          : ''
      }
      <TracksList tracks={collection.items} type={collectionType} />
    </Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  token: selectCurrentUserToken,
  album: selectAlbum,
  playlist: selectPlaylist
})

const mapDispatchToProps = dispatch => ({
  setAlbum: (album) => dispatch(setAlbum(album)),
  removeAlbum: () => dispatch(removeAlbum())
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection);