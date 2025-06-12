import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import SearchPage from './pages/SearchPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
  <Router>
    <div>

      <header className='border-b-1 border-secondary'>
        <div className='container'>
          <Header></Header>
        </div>
      </header>

      <main className='mt-5 border-b-1 border-secondary pb-10'>
        <div className='container rounded-lg p-4 mt-4'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<SearchPage />} />
            </Routes>
        </div>
      </main>

      <footer className='mt-10'>
       <div className='container'>
        <Footer></Footer>
        </div>
      </footer>

    </div>
  </Router>

  )
}

export default App
