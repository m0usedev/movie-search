import { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import YearsSlider from '../Froms/YearsSlider';
import ButtonIcon from '../Buttons/ButtonIcon';

import icon from '../../assets/menu-icon.png'

import '../../style/components/Search-Movies/MovieSearch.css'
import '../../style/components/Inputs/InputText.css'

export default function MovieSearch ({ titleSearch, yearSearch, orderMovies }) {
  let titleSearchRef = useRef(null)
  let formOrder = useRef(null)
  let [visible, setVisible] = useState(false);

  const onChange = (e) => {
    e.preventDefault()
    titleSearch(titleSearchRef.current.value)
  }

  const onClickVisibleForm = () => {
    setVisible(true)
  }

  useEffect( () => {
    let primeraVez = false

    const outOnClick = (e) => {
      if (primeraVez && !formOrder.current.contains(e.target)) {
        setVisible(false)
      }
      primeraVez = true
    }
    
    window.addEventListener('click', outOnClick)

    
    return () => {
      window.removeEventListener('click', outOnClick)
    }
  },[visible])

  return (
  <div>

    <div>
      <form className='From-Search' onChange={onChange} onSubmit={(e) => { e.preventDefault() }}>
          <table>
            <tr>
              <td>
                <label>Pelicula:</label>
              </td>
              <td>
                <input 
                  ref={titleSearchRef}
                  type="text"
                  className="input input-text"
                  placeholder="Matrix, The Avengers..."
                />
              </td>
              <td>
                <ButtonIcon 
                  icon={icon}
                  alt='Orden de resultados icon'
                  title='Orden de resultados'
                  onClick={onClickVisibleForm}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Años:</label>
              </td>
              <td>
                <YearsSlider firstNumber={1896} secondNumber={new Date().getFullYear()} yearSearch={yearSearch}/>
              </td>
              <td></td>
            </tr>
          </table>
         </form>
    </div>
    
    <div data-visible={visible}>
      <div className='blur-background' />
      <form
        ref={formOrder}
        className='Form-Order'
        
        onChange={orderMovies} 
        onSubmit={(e) => { e.preventDefault() }} 
      >
        <label>
          <input type="radio" name="orden" value="AZ" />
          A-Z
        </label>
        <label>
          <input type="radio" name="orden" value="ZA" />
          Z-A
        </label>
        <label>
          <input type="radio" name="orden" value="anioUp" />
          Año de menor a mayor
        </label>
        <label>
          <input type="radio" name="orden" value="anioDown" />
          Año de mayor a menor
        </label>
      </form>
    </div>

  </div>
  )
}

MovieSearch.propTypes = {
  titleSearch: PropTypes.func,
  yearSearch: PropTypes.func,
  orderMovies: PropTypes.func
};
