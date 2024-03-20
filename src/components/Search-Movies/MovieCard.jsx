import PropTypes from 'prop-types';

import '../../style/components/Search-Movies/MovieCard.css'

const IMDBURL = 'https://www.imdb.com/title/'

export default function MovieCard ({ title, year, img, imdbID }) {
  return (
    <section className="MovieCard">
      <a href={IMDBURL+imdbID}>
        <div>
          <img src={img} alt={title} title={title}/>
        </div>
        <div>
          <h3 className='title-movie'>{title}</h3>
        </div>
        <div>
          <span>{year}</span>
        </div>
      </a>
    </section>
  )
}

MovieCard.propTypes = {
  title: PropTypes.string,
  year: PropTypes.string,
  img: PropTypes.string,
  imdbID: PropTypes.string,
};