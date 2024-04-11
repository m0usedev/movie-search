import { useState, useRef, useEffect } from "react";

import PropTypes from 'prop-types';

import ButtonIcon from '../Buttons/ButtonIcon';

import icon from '../../assets/menu-icon.png'

import './style/MovieFilter.css'

export default function MovieFilter({ orderMovies }) {
  let [visible, setVisible] = useState(false)
  let formOrder = useRef(null)

  const onClickVisibleForm = () => {
    setVisible(true)
  }

  useEffect(() => {
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
  }, [visible])

  return (
    <div className="MovieFilter">
      <div>
        <ButtonIcon
          icon    = {icon}
          alt     = 'Orden de resultados icon'
          title   = 'Orden de resultados'
          onClick = {onClickVisibleForm}
        />
      </div>
      <div data-visible={visible} >
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

MovieFilter.propTypes = {
  orderMovies: PropTypes.func
};
