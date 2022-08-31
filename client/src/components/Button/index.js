import './Button.css';

const Button = (props) => {
  const {
    children,
    id = '',
    name = '',
    onClick = e => e,
    className = '',
    color = 'accent',
    disabled = false,
    style = {},
    value = '',
  } = props;

  return (
    <button
      style={ style }
      className={`
        Button
        text-white
        bg-${ color }
        bg-${ color }-hover
        ${ disabled && 'bg-accent-disabled Button-disabled' }
        ${ className }
      `}
      id={ id }
      name={ name }
      value={ value }
      onClick={ !disabled ? onClick : e => e }
      disabled={ disabled }
    >
      { children }
    </button>
  );
};

export default Button;