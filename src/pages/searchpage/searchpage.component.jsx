import axios from "axios"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import { API_ENDPOINT } from "../../endpoints"
import { setReturnedArtists, setReturnedAlbums, setReturnedPlaylists } from "../../redux/search/search.actions"
import { selectCurrentUserToken } from "../../redux/user/user.selectors"
import {
  selectReturnedAlbums,
  selectReturnedArtists,
  selectReturnedPlaylists,
  selectSearchTerm
} from "../../redux/search/search.selectors"

import SearchBox from "../../components/searchbox/searchbox.component"
import Card from "../../components/card/card.component"
import CardsGroup from "../../components/cards-group/cards-group.component"

import './searchpage.styles.scss'

const SearchPage = ({
  searchTerm,
  token,
  setReturnedArtists,
  setReturnedAlbums,
  setReturnedPlaylists,
  artists,
  albums,
  playlists
}) => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` }

    const getCategories = () => {
      axios({
        method: 'get',
        headers: headers,
        url: `${API_ENDPOINT}browse/categories`
      })
        .then(result => setCategories(result.data.categories.items))
        .catch(error => console.log(error))
    }

    const fetchSearchResults = () => {
      axios({
        method: 'get',
        headers: headers,
        url: `${API_ENDPOINT}search?q=${searchTerm}&type=artist`
      })
        .then(result => setReturnedArtists(result.data.artists.items))
        .catch(error => console.log(error))
      axios({
        method: 'get',
        headers: headers,
        url: `${API_ENDPOINT}search?q=${searchTerm}&type=album`
      })
        .then(result => setReturnedAlbums(result.data.albums.items))
        .catch(error => console.log(error))
      axios({
        method: 'get',
        headers: headers,
        url: `${API_ENDPOINT}search?q=${searchTerm}&type=playlist`
      })
        .then(result => setReturnedPlaylists(result.data.playlists.items))
        .catch(error => console.log(error))
    }

    searchTerm.length > 0
      ? fetchSearchResults()
      : getCategories()
  }, [token, searchTerm, setReturnedArtists, setReturnedAlbums, setReturnedPlaylists])

  const searchResults = <div className="search-results">
    <CardsGroup displayItems={artists} groupHeader={'Artists'} />
    <CardsGroup displayItems={albums} groupHeader={'Albums'} />
    <CardsGroup displayItems={playlists} groupHeader={'Playlists'} />
  </div>

  const browseSection = <div className="browse">
    <h2>Browse all</h2>
    <div className="categories-grid">
      {
        categories.map((category, index) =>
          <Card
            key={index}
            imageUrl={category.icons[0].url}
            name={category.name}
            playlist={false}
          />
        )
      }
    </div>
  </div>

  return (
    <div className="search-page">
      <SearchBox />
      {
        searchTerm
          ? searchResults
          : browseSection
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  token: selectCurrentUserToken,
  searchTerm: selectSearchTerm,
  artists: selectReturnedArtists,
  albums: selectReturnedAlbums,
  playlists: selectReturnedPlaylists
})

const mapDispatchToProps = dispatch => ({
  setReturnedArtists: returnedArtists => dispatch(setReturnedArtists(returnedArtists)),
  setReturnedAlbums: returnedAlbums => dispatch(setReturnedAlbums(returnedAlbums)),
  setReturnedPlaylists: returnedPlaylists => dispatch(setReturnedPlaylists(returnedPlaylists))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)