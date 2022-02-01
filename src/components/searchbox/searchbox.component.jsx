import { connect } from 'react-redux'
import { debounce } from 'lodash'

import { setSearchTerm } from '../../redux/search/search.actions'
import { clearSearch } from '../../redux/search/search.actions'

import './searchbox.styles.scss'
import { useEffect } from 'react'

const SearchBox = ({ setSearchTerm, clearSearch }) => {

  useEffect(() => {
    return () => {
      setSearchTerm('')
      clearSearch()
    }
  }, [setSearchTerm, clearSearch])

  const handlechange = (e) => {
    setSearchTerm(e?.target?.value)
  }

  const debouncedHandler = debounce(handlechange, 500)

  return (
    <div className='search'>
      <input
        placeholder="search playlists"
        className="search-box"
        onChange={debouncedHandler}
      />
      <i className='bi bi-search'></i>
    </div>
  )
}


const mapDispatchToProps = (dispatch) => ({
  setSearchTerm: searchTerm => dispatch(setSearchTerm(searchTerm)),
  clearSearch: () => dispatch(clearSearch())
})

export default connect(null, mapDispatchToProps)(SearchBox)