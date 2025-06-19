import Header from './components/Layout/Header'
import Home from './pages/HomePage'
import Footer from './components/Layout/Footer'
import SearchPage from './pages/SearchPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursePage from './pages/CoursePage';
import CourseContentPage from './pages/CourseContentPage';
import MyLearningPage from './pages/MyLearningPage';

function App() {

  return (
  <Router>
    <div>

      <header className='border-b-1 border-secondary'>
        <div className='container'>
          <Header></Header>
        </div>
      </header>

      <main className='mt-5 border-b-1 border-secondary pb-10 '>
        <div className='rounded-lg mt-4'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/course/:id' element={<CoursePage/>} />
              <Route path='/course/:id/content' element={<CourseContentPage/>}/>
              <Route path='/my-learning/' element= {<MyLearningPage/>}></Route>
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
