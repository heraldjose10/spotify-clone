import { connect } from 'react-redux'

import { setSearchTerm } from '../../redux/search/search.actions'

import './searchbox.styles.scss'

const SearchBox = ({setSearchTerm}) => {
  const handlechange = (e) => setSearchTerm(e.target.value)

  return (
    <div className='search'>
      <input
        placeholder="search playlists"
        className="search-box"
        onChange={handlechange}
      />
      <i className='bi bi-search'></i>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setSearchTerm: searchTerm => dispatch(setSearchTerm(searchTerm))
})

export default connect(null, mapDispatchToProps)(SearchBox)