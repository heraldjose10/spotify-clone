import { Route, Routes } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import SideBar from './components/side-bar/side-bar.component';
import HomePage from './pages/homepage/homepage.component';
import Library from './pages/library/library.component';
import PlaylistPage from './pages/playlist-page/playlist-page.component';
import Playlist from './components/playlist/playlist.component';
import LoginPrompt from './pages/login-prompt/login-prompt.component';
import MusicPlayer from './components/music-player/music-player.component';
import SearchPage from './pages/searchpage/searchpage.component';
import UserProfileDropdown from './components/user-profile-dropdown/user-profile-dropdown.component';

import { selectCurrentUser, selectCurrentUserToken } from './redux/user/user.selectors';
import { selectNowPlaying } from './redux/player/player.selectors';

function App({ currentUser, nowPlaying, currentUserToken }) {
  return (
    <div className='app'>
      {
        currentUserToken ? <SideBar /> : ''
      }
      {
        currentUserToken ? <UserProfileDropdown /> : ''
      }
      <Routes>
        <Route path='/' element={
          currentUserToken ? <HomePage /> : <LoginPrompt />
        } />
        <Route path='/dash' element={<HomePage />} />
        <Route path='/library' element={<Library />} />
        <Route path='/playlist' element={<PlaylistPage />}>
          <Route path='liked' element={<Playlist liked={true} />} />
          <Route path=':playlistId' element={<Playlist />} />
        </Route>
        <Route path='/search' element={<SearchPage />} />
      </Routes>
      {
        currentUser && nowPlaying ? <MusicPlayer /> : ''
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  nowPlaying: selectNowPlaying,
  currentUserToken: selectCurrentUserToken
})

export default connect(mapStateToProps)(App);
