import { useState } from 'react'

import useMovies from './hooks/useMovies.jsx'

import MovieSearch from './MovieSearch.jsx'
import MovieFilter from './MovieFilter.jsx'
import MovieList from './MovieList.jsx'
import LoadingList from '../List/LoadingList.jsx'
import ErrorList from '../List/ErrorList.jsx'

import './style/Movies.css'

export default function Movies() {
  const [title, setTitle] = useState(null);
  const [firstYear, setFirstYear] = useState(null);
  const [secondYear, setSecondYear] = useState(null);
  const [order, setOrder] = useState(null);

  const { movies, loading, errorSearch } = useMovies({ title, firstYear, secondYear, order });


  const titleSearch = (titleS) => {
    setTitle(titleS)
  }

  const yearSearch = ({ firstY, secondY = null }) => {
    if(firstYear!=firstY || secondYear!=secondY) {
      if (!secondY) {
        setFirstYear(firstY)
        setSecondYear(firstY)
      } else {
        setFirstYear(firstY)
        setSecondYear(secondY)
      }
    }
  }

  const orderMovies = (e) => {
    switch (e.target.value) {
      case 'AZ':
        setOrder(['title', 'asc'])
        break;
      case 'ZA':
        setOrder(['title', 'down'])
        break;
      case 'anioUp':
        setOrder(['year', 'asc'])
        break;
      case 'anioDown':
        setOrder(['year', 'down'])
        break;
      default:
        setOrder(null)
        break;
    }
  };

  return (
    <div className="Movies">
      <header className='header-movies'>
        <MovieSearch 
          titleSearch = {titleSearch} 
          yearSearch  = {yearSearch} 
        />
        <MovieFilter orderMovies = {orderMovies} />
      </header>
      <section className='listMovies' >
        {
          movies ?
            <MovieList movies={movies} />
            :
            loading ?
              <LoadingList />
              :
              null
        }
      </section>
      <footer>
        {
          movies ?
            errorSearch ?
              <ErrorList />
              :
              loading ?
                <LoadingList />
                :
                null
            :
            null
        }
      </footer>
    </div>
  )
}