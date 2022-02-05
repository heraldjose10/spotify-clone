import { Route, Routes } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useEffect } from 'react';

import { selectLoggedAt, selectCurrentUserToken } from './redux/user/user.selectors';
import { logoutCurrentUser } from './redux/user/user.actions';

import './App.css';

import SideBar from './components/side-bar/side-bar.component';
import HomePage from './pages/homepage/homepage.component';
import Library from './pages/library/library.component';
import PlaylistPage from './pages/playlist-page/playlist-page.component';
import LoginPrompt from './pages/login-prompt/login-prompt.component';
import MusicPlayer from './components/music-player/music-player.component';
import SearchPage from './pages/searchpage/searchpage.component';
import UserProfileDropdown from './components/user-profile-dropdown/user-profile-dropdown.component';
import AlbumPage from './pages/album-page/album-page.componenent';
import Collection from './components/collection/collection.component';


function App({ loggedAt, logoutCurrentUser, token }) {

  let currentTime = new Date()
  let loggedDate = new Date(loggedAt)
  const logged = (Math.abs(currentTime - loggedDate) < 3600000) && loggedAt !== null

  useEffect(() => {
    if (logged === false && loggedAt !== null) {
      logoutCurrentUser()
    }
  }, [logged, logoutCurrentUser, loggedAt])


  return (
    <div className='app'>
      {
        logged === true ? <SideBar /> : ''
      }
      {
        logged === true ? <UserProfileDropdown /> : ''
      }
      <Routes>
        <Route path='/' element={
          logged === true ? <HomePage /> : <LoginPrompt />
        } />
        <Route path='/dash' element={<HomePage />} />
        <Route path='/library' element={<Library />} />
        <Route path='/playlist' element={<PlaylistPage />}>
          <Route path='liked' element={<Collection collectionType={'liked'} />} />
          <Route path=':playlistid' element={<Collection collectionType={'playlist'} />} />
        </Route>
        <Route path='/search' element={<SearchPage />} />
        <Route path='/album' element={<AlbumPage />}>
          <Route path=':albumid' element={<Collection collectionType={'album'} />} />
        </Route>
      </Routes>
      {
        (logged === true) ? <MusicPlayer /> : ''
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  loggedAt: selectLoggedAt,
  token: selectCurrentUserToken
})

const mapDispatchToProps = dispatch => ({
  logoutCurrentUser: () => dispatch(logoutCurrentUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
