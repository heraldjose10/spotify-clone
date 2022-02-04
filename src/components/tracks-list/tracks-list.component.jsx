import { useRef, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import Track from '../track/track.component'

import { selectIsFetching, selectNext } from '../../redux/collection/collection.selectors'
import { updateCollectionItemsAsync } from '../../redux/collection/collection.actions'
import { selectCurrentUserToken } from '../../redux/user/user.selectors'

import './tracks-list.styles.scss'

const TracksList = ({ tracks, isLoading, next, updateCollectionItemsAsync, token, type }) => {

  const observer = useRef()

  const lastTrackRef = useCallback(node => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && next) {
        updateCollectionItemsAsync({ token, next })
      }
    })
    if (node) observer.current.observe(node)
  }, [next, isLoading, updateCollectionItemsAsync, token])

  return (
    <div className='tracks-list'>
      <div className='list-header'>
        <span className='name heading'>title</span>
        {
          type === 'playlist' ? <span className='album heading'>album</span> : ''
        }
        {
          type === 'playlist' ? <span className='date heading'>date added</span> : ''
        }
        {
          type === 'album' ? <span className='artists heading'>artists</span> : ''
        }
        <span className='duration heading'>time</span>
      </div>
      {
        tracks.length > 0
          ? tracks.map((track, index) => {
            if (tracks.length === index + 1) {
              return <div ref={lastTrackRef} key={track.id}><Track track={track} /></div>
            }
            else {
              return <div key={track.id}><Track track={track} /></div>
            }
          })
          : ''
      }
      {
        isLoading ? <div>loading ...</div> : ''
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  next: selectNext,
  isLoading: selectIsFetching,
  token: selectCurrentUserToken
})

const mapDispatchToProps = dispatch => ({
  updateCollectionItemsAsync: (data) => dispatch(updateCollectionItemsAsync(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TracksList)