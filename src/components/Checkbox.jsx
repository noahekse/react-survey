
import PropTypes from 'prop-types';

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default function Checkbox({ id, name, value, label, onChange, checked }) {
  return (
    <li>
      <label>
        <input id={id} type="checkbox" name={name} value={value} onChange={onChange} checked={checked} />
        {label}
      </label>
    </li>
)}



  