import { createSelector } from "reselect";

const selectCollection = (state) => state.collection

export const selectAlbum = createSelector(
  [selectCollection],
  collection => collection.album
)

export const selectPlaylist = createSelector(
  [selectCollection],
  collection => ({
    details: collection.playlist.details,
    items: collection.playlist.items.map(
      track => ({
        ...track.track,
        added_at: track.added_at
      })
    )
  })
)

export const selectLikedTracks = createSelector(
  [selectCollection],
  collection => ({
    details: collection.likedTracks.details,
    items: collection.likedTracks.items.map(
      item => ({
        ...item.track,
        added_at: item.added_at
      })
    )
  })
)