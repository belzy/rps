import './Select.css'

const Select = (props) => {
  const {
    onChange = e => e,
    id = '',
    name = '',
    options = [],
    size = 1,
    style = {},
    multiple = false
  } = props;

  return (
    <select 
      className={`
        Select
      `}
      size={ size }
      onChange={ e => onChange(e) }
      name={ name }
      id={ id }
      style={ style }
      multiple={ multiple }
    >
      { options.length && options.map((option, i) => {
        return (
          <option
            key={ i }
            value={ option.value }
          >
            { option.text }
          </option>
        );
      }) }
    </select>
  );
};

export default Select;