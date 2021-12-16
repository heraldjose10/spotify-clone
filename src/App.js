import { Route, Routes } from 'react-router';

import './App.css';

import SideBar from './components/side-bar/side-bar.component';
import HomePage from './pages/homepage/homepage.component';
import Library from './pages/library/library.component';
import PlaylistPage from './pages/playlist-page/playlist-page.component';
import Playlist from './components/playlist/playlist.component';

function App() {
  return (
    <div className='app'>
      <SideBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/library' element={<Library />} />
        <Route path='/playlist' element={<PlaylistPage />}>
          <Route path='liked' element={<Playlist likedSongs={true} />} />
          <Route path=':playlistId' element={<Playlist />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
