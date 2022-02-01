import { useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import {
  fetchCategoriesAsync,
  fetchSearchResulstsAsync,
  clearSearch
} from "../../redux/search/search.actions"
import { selectCurrentUserToken } from "../../redux/user/user.selectors"
import {
  selectCategories,
  selectArtistsItems,
  selectSearchTerm,
  selectAlbumsItems,
  selectPlaylistsItems
} from "../../redux/search/search.selectors"

import SearchBox from "../../components/searchbox/searchbox.component"
import Card from "../../components/card/card.component"
import CardsGroup from "../../components/cards-group/cards-group.component"

import './searchpage.styles.scss'

const SearchPage = ({
  searchTerm,
  token,
  artists,
  albums,
  playlists,
  categories,
  fetchSearchResulstsAsync,
  fetchCategoriesAsync,
  clearSearch
}) => {

  useEffect(() => {
    if (searchTerm.length > 0) {
      fetchSearchResulstsAsync({ token, searchTerm, type: 'artist' })
      fetchSearchResulstsAsync({ token, searchTerm, type: 'album' })
      fetchSearchResulstsAsync({ token, searchTerm, type: 'playlist' })
    }
    else {
      clearSearch()
      fetchCategoriesAsync({ token })
    }
  }, [token, searchTerm, fetchSearchResulstsAsync, fetchCategoriesAsync, clearSearch])

  const searchResults = <div className="search-results">
    <CardsGroup displayItems={artists} groupHeader={'Artists'} groupType={'artist'} />
    <CardsGroup displayItems={albums} groupHeader={'Albums'} groupType={'album'} />
    <CardsGroup displayItems={playlists} groupHeader={'Playlists'} groupType={'playlist'} />
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
  artists: selectArtistsItems,
  albums: selectAlbumsItems,
  playlists: selectPlaylistsItems,
  categories: selectCategories
})

const mapDispatchToProps = dispatch => ({
  fetchCategoriesAsync: (data) => dispatch(fetchCategoriesAsync(data)),
  fetchSearchResulstsAsync: (data) => dispatch(fetchSearchResulstsAsync(data)),
  clearSearch: () => dispatch(clearSearch())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)