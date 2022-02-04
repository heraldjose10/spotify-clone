import { createSelector } from "reselect";

const selectCollection = (state) => state.collection

export const selectAlbum = createSelector(
  [selectCollection],
  collection => ({
    details: collection.details,
    items: collection.items
  })
)

export const selectPlaylist = createSelector(
  [selectCollection],
  collection => ({
    details: collection.details,
    items: collection.items.map(
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
    details: collection.details,
    items: collection.items.map(
      item => ({
        ...item.track,
        added_at: item.added_at
      })
    )
  })
)

export const selectIsFetching = createSelector(
  [selectCollection],
  collection => collection.isFetching
)

export const selectNext = createSelector(
  [selectCollection],
  collection => collection.next
)