import React, { useState } from 'react';
import rock from '../../assets/img/rock.png';
import paper from '../../assets/img/paper.png';
import scissors from '../../assets/img/scissors.png';
import question from '../../assets/img/question.png';

const RpsIcon = ({ icon }) => {

  let img;
  if (icon === 'rock') img = rock;
  else if (icon === 'paper') img = paper;
  else if (icon === 'scissors') img = scissors;
  else if (icon === 'question') img = question;

  return (

    <img width="120" height="120" src={ img }></img>

  );
};

export default RpsIcon;