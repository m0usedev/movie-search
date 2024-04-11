import { useRef } from 'react';

import PropTypes from 'prop-types';

import YearsSlider from '../Froms/YearsSlider';


import './style/MovieSearch.css'
import '../../style/Inputs/Input.css'

export default function MovieSearch({ titleSearch, yearSearch }) {
  let titleSearchRef = useRef(null)

  const onChange = (e) => {
    e.preventDefault()
    titleSearch(titleSearchRef.current.value)
  }

  return (
    <div className='MovieSearch'>
      <form 
        className = 'From-Search' 
        onChange  = {onChange} 
        onSubmit  = {(e) => { e.preventDefault() }}
      >
        <div className='part-from'>
          <label>Película:</label>
          <label>Años:</label>
        </div>
        <div className='part-from'>
          <input
            ref={titleSearchRef}
            type="text"
            className="input input-text"
            placeholder="Matrix, The Avengers..."
          />
          <YearsSlider
            firstNumber  ={1896}
            secondNumber = {new Date().getFullYear()}
            yearSearch   = {yearSearch}
          />
        </div>
      </form>
    </div>
  )
}

MovieSearch.propTypes = {
  titleSearch: PropTypes.func,
  yearSearch: PropTypes.func
};
