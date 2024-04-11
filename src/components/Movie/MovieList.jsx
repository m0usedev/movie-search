import PropTypes from 'prop-types';

import MovieCard from './MovieCard'

import './style/MovieList.css'

export default function MovieList({ movies }) {
  return (
    <div className='MovieList'>
      {
        movies.map((element) => {
          return (
            <MovieCard
              key    = {element.imdbID}
              title  = {element.title}
              year   = {element.year}
              img    = {element.img}
              imdbID = {element.imdbID}
            />
          )
        })
      }
    </div>
  )
}

MovieList.propTypes = {
  movies: PropTypes.array,
};