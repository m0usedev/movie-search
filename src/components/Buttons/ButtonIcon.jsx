import PropTypes from 'prop-types';

import './style/ButtonIcon.css'

export default function ButtonIcon ({ icon, alt = 'icon', title = 'icon', onClick }) {
  return (
    <button className='Button ButtonIcon' type='button' onClick={onClick}>
      <img src={icon} alt={alt} title={title}/>
    </button>
  )
}

ButtonIcon.propTypes = {
  icon : PropTypes.string,
  alt : PropTypes.string,
  title : PropTypes.string,
  onClick : PropTypes.func
};
