import { Route, Routes } from 'react-router';
import { connect } from 'react-redux';

import './App.css';

import SideBar from './components/side-bar/side-bar.component';
import HomePage from './pages/homepage/homepage.component';
import Library from './pages/library/library.component';
import PlaylistPage from './pages/playlist-page/playlist-page.component';
import Playlist from './components/playlist/playlist.component';
import LoginPrompt from './pages/login-prompt/login-prompt.component';

function App({ currentUser }) {
  return (
    <div className='app'>
      {
        currentUser ? <SideBar /> : ''
      }
      <Routes>
        <Route path='/' element={
          currentUser ? <HomePage /> : <LoginPrompt />
        } />
        <Route path='/dash' element={<HomePage />} />
        <Route path='/library' element={<Library />} />
        <Route path='/playlist' element={<PlaylistPage />}>
          <Route path='liked' element={<Playlist liked={true} />} />
          <Route path=':playlistId' element={<Playlist />} />
        </Route>
      </Routes>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App);
