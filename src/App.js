import { Route, Routes } from 'react-router';
import './App.css';
import SideBar from './components/side-bar/side-bar.component';
import HomePage from './pages/homepage/homepage.component';
import Library from './pages/library/library.component';

function App() {
  return (
    <div className='app'>
      <SideBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/library' element={<Library />} />
      </Routes>
    </div>
  )
}

export default App;
