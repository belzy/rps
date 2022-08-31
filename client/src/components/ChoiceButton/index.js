import React from 'react';

const ChoiceButton = ({ choice, onClick }) => {

  return (
    <button 
      className="button"
      onClick={ e => onClick(e, choice) }
    >{ choice }</button>
  );
};

export default ChoiceButton;