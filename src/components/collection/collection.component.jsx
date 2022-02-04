import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCurrentUserToken,
  selectCurrentUserDisplayName
} from "../../redux/user/user.selectors";
import {
  removeCOllection,
  fetchCollectionAsync,
  fetchLikedTracksAsync
} from "../../redux/collection/collection.actions";
import {
  selectAlbum,
  selectLikedTracks,
  selectPlaylist
} from "../../redux/collection/collection.selectors";

import Banner from "../banner/banner.component";
import TracksList from "../tracks-list/tracks-list.component";

import './collection.styles.scss'

const Collection = ({
  token,
  collectionType,
  album,
  displayName,
  playlist,
  likedTracks,
  removeCOllection,
  fetchCollectionAsync,
  fetchLikedTracksAsync
}) => {
  const params = useParams()
  const id = params[`${collectionType}id`]

  useEffect(() => {
    if (collectionType === 'liked') {
      fetchLikedTracksAsync({ token, displayName })
    }
    else {
      fetchCollectionAsync({ token, collectionType, id })
    }
    return () => removeCOllection()
  }, [
    collectionType,
    id,
    token,
    fetchLikedTracksAsync,
    displayName,
    fetchCollectionAsync,
    removeCOllection
  ])

  let collection = null

  if (collectionType === 'album') {
    collection = album
  }
  else if (collectionType === 'playlist') {
    collection = playlist
  }
  else if (collectionType === 'liked') {
    collection = likedTracks
  }

  return (
    <Fragment>
      {
        Object.keys(collection.details).length > 0
          ? <Banner {...collection.details} />
          : ''
      }
      <TracksList tracks={collection.items} type={collection.details.type} />
    </Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  token: selectCurrentUserToken,
  album: selectAlbum,
  playlist: selectPlaylist,
  likedTracks: selectLikedTracks,
  displayName: selectCurrentUserDisplayName
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionAsync: (data) => dispatch(fetchCollectionAsync(data)),
  fetchLikedTracksAsync: data => dispatch(fetchLikedTracksAsync(data)),
  removeCOllection: () => dispatch(removeCOllection())
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection);