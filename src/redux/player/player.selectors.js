import { createSelector } from "reselect";

const selectPlayer = state => state.player

export const selectPlayerIsPlaying = createSelector(
  [selectPlayer],
  player => player.isPlaying
)

export const selectNowPlaying = createSelector(
  [selectPlayer],
  player => player.nowPlaying
)

export const selectRecentTracksItems = createSelector(
  [selectPlayer],
  player => player.recentTracks.items.map(item => ({
    ...item.track
  }))
)

export const selectPlayQueue = createSelector(
  [selectPlayer],
  player => player.playQueue
)