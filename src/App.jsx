import { Routes,Route } from 'react-router-dom'
import './css/App.css'
import Home  from './pages/home'
import Favourites from './pages/faviourate'
import NavBar from './component/navBar'
import { FavoritesProvider } from './context/FavoritesContext'

function App() {
  return (
    <FavoritesProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/favourites" element = {<Favourites/>}/>
        </Routes>
      </main>
    </FavoritesProvider>
  )
}

export default App
 