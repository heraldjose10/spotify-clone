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

export const selectRecentTracks = createSelector(
  [selectPlayer],
  player => player.recentTracks
)