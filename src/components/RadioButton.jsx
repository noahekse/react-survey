
import PropTypes from 'prop-types';

RadioButton.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
  };

export default function RadioButton({ id, name, value, label, onChange, checked }) {
    return (
      <li>
        <input id={id} type="radio" name={name} value={value} onChange={onChange} checked={checked} />
        <label htmlFor={id}>{label}</label>
      </li>
    )}
  


  