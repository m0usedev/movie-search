import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { debounce } from '@mui/material';

import PropTypes from 'prop-types';

import '../../style/components/Froms/YearsSlider.css'

export default function YearsSlider({ firstNumber, secondNumber, yearSearch }) {
  const [value, setValue] = useState([firstNumber, secondNumber]);
  const debounceValue = debounce(value, 600)

  useEffect( () => {
    yearSearch({firstY:value[0], secondY:value[1]})
  }
  ,[debounceValue])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  return (
    <Box sx={{ width: 300 }}>
      <div className='YearsSlider'>
        <h4>{value[0]}</h4>
        <Slider
          getAriaLabel={() => 'Rango de años'}
          value={value}
          onChange={(handleChange)}
          valueLabelDisplay="auto"
          min={1896} // Establece el valor mínimo según el primer elemento del estado
          max={new Date().getFullYear()} // Establece el valor máximo según el año actual
        />
        <h4>{value[1]}</h4>
      </div>
    </Box>
  );
}

YearsSlider.propTypes = {
  firstNumber: PropTypes.number,
  secondNumber: PropTypes.number,
  yearSearch: PropTypes.func
}