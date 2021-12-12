import { Route, Routes } from 'react-router';
import './App.css';
import SideBar from './components/side-bar/side-bar.component';
import HomePage from './pages/homepage/homepage.component';
import Library from './pages/library/library.component';
import Playlist from './pages/playlist/playlist.component';

function App() {
  return (
    <div className='app'>
      <SideBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/library' element={<Library />} />
        <Route path='/playlist/:playlistId' element={<Playlist />} />
      </Routes>
    </div>
  )
}

export default App;
