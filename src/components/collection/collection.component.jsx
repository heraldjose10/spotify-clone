import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { API_ENDPOINT } from "../../endpoints";
import { selectCurrentUserToken } from "../../redux/user/user.selectors";
import { setAlbum, removeAlbum, setPlaylist, removePlaylist } from "../../redux/collection/collection.actions";
import { selectAlbum, selectPlaylist } from "../../redux/collection/collection.selectors";

import Banner from "../banner/banner.component";
import TracksList from "../tracks-list/tracks-list.component";

import './collection.styles.scss'

const Collection = ({ token, collectionType, setAlbum, album, playlist, removeAlbum, setPlaylist, removePlaylist }) => {

  const params = useParams()
  const id = params[`${collectionType}id`]

  useEffect(() => {
    const fetchAndSetCollection = async () => {
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const response = await axios({
          method: 'get',
          headers: headers,
          url: `${API_ENDPOINT}${collectionType}s/${id}`
        })
        const collection = response.data
        if (collectionType === 'album') {
          setAlbum({
            items: collection.tracks.items,
            details: {
              albumArtURL: collection.images.length > 0 ? collection.images[0].url : null,
              type: collection.type,
              name: collection.name,
              artists: collection.artists,
              total: collection.tracks.total,
              releaseDate: collection.release_date
            }
          })
        }
        else if (collectionType === 'playlist') {
          setPlaylist({
            items: collection.tracks.items,
            details: {
              id: collection.id,
              name: collection.name,
              albumArtURL: collection.images[0].url,
              createdBy: collection.owner.display_name,
              total: collection.tracks.total,
              description: collection.description,
              followers: collection.followers.total,
              type: collection.type
            }
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAndSetCollection();
    if (collectionType === 'playlist') {
      return () => removePlaylist()
    }
    else if (collectionType === 'album') {
      return () => removeAlbum()
    }
  }, [collectionType, id, token, setAlbum, removePlaylist, removeAlbum, setPlaylist])

  const collection = collectionType === 'album' ? album : playlist

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
  removeAlbum: () => dispatch(removeAlbum()),
  setPlaylist: (playlist) => dispatch(setPlaylist(playlist)),
  removePlaylist: () => dispatch(removePlaylist())
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection);