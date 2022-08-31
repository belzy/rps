
export default (props) => {
  const {
    children,
  } = props;

  return (
    <div 
      className={`
        HomePage 
        bg-primary
        d-flex 
        flex-direction-column 
        justify-content-center
        align-items-center
        w-100 
        h-100
      `}
    >
      { children }
    </div>
  );
};