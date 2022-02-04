import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchUserPlaylistsStartAsync } from "../../redux/user/user.actions";
import { selectCurrentUserId, selectCurrentUserToken } from "../../redux/user/user.selectors";
import { selectUserPlaylistsItems } from "../../redux/user/user.selectors";

import Card from "../card/card.component";
import LikedSongsCard from "../liked-songs-card/liked-songs-card.component";

import './cards-grid.styles.scss'

const CardsGrid = ({ token, userId, playlists, fetchUserPlaylistsStartAsync }) => {

  useEffect(() => {
    fetchUserPlaylistsStartAsync({ token, userId })
  }, [userId, token, fetchUserPlaylistsStartAsync])

  return (
    <div className='cards-grid'>
      <Link to='/playlist/liked' className="liked">
        <LikedSongsCard />
      </Link>
      {playlists.map((playlist) =>
        <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
          <Card
            imageUrl={playlist.images[0].url}
            name={playlist.name}
            owner={playlist.owner.display_name}
            playlist={true}
          />
        </Link>
      )}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  token: selectCurrentUserToken,
  userId: selectCurrentUserId,
  playlists: selectUserPlaylistsItems
})

const mapDispatchToProps = dispatch => ({
  fetchUserPlaylistsStartAsync: (playlists) => dispatch(fetchUserPlaylistsStartAsync(playlists))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardsGrid)