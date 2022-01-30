import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectSearchTerm } from '../../redux/search/search.selectors'
import { setSearchTerm } from '../../redux/search/search.actions'

import './searchbox.styles.scss'

const SearchBox = ({ setSearchTerm, searchTerm }) => {
  const handlechange = (e) => setSearchTerm(e.target.value)

  return (
    <div className='search'>
      <input
        placeholder="search playlists"
        className="search-box"
        onChange={handlechange}
        value={searchTerm}
      />
      <i className='bi bi-search'></i>
    </div>
  )
}

const mapStateToProp = createStructuredSelector({
  searchTerm: selectSearchTerm
})

const mapDispatchToProps = (dispatch) => ({
  setSearchTerm: searchTerm => dispatch(setSearchTerm(searchTerm))
})

export default connect(mapStateToProp, mapDispatchToProps)(SearchBox)