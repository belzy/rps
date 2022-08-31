import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  Button,
  ChoiceButton,
  Page,
  RpsIcon,
} from '../../components';

let socket;

const generateRandomChoice = () => {
  const choices = ['paper', 'rock', 'scissors']
  const rand = Math.floor(( Math.random() * 3 ))
  return choices[rand];
};

const determineWinner = (userChoice, randomChoice) => {
  if (userChoice === randomChoice) return 0;
  if (
    userChoice === 'paper' && randomChoice === 'rock' ||
    userChoice === 'rock' && randomChoice === 'scissors' ||
    userChoice === 'scissors' && randomChoice === 'paper'
   ) return 1;
   else return 2;
};

const joinGame = (gameName, username) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/games/${ gameName }/join?username=${ username }`, {
      method: 'get',
    }).then(res => res.json())
    .then(resolve)
    .catch(reject);
  });
};

const getGameData = (gameName) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/games/${ gameName }`, {
      method: 'get',
    }).then(res => res.json())
    .then(resolve)
    .catch(reject);
  });
};

let interval = null;
const Lobby = (props) => {
  const {
    gameStatus,
    setGameStatus,
  } = props;

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (gameStatus === 'starting' && countdown === 5) {
      let i = 5;
      interval = setInterval(() => {
        setCountdown(--i);
        console.log(i);
      }, 1000);
    } 

    return () => {
      if (interval) clearInterval(interval);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (countdown < 0) {
      setGameStatus('started');
    }
  }, [countdown]);

  return (
    <p>
      { gameStatus === 'waiting' && 'Waiting for a player to join...' }
      { gameStatus === 'starting' && `Player joined, starting game in ${ countdown < 0 ? 0 : countdown }` }
    </p>
  )
};

const Game = (props) => {
  const {
    gameStatus,
    setGameStatus,
  } = props;
  const [choice, setChoice] = useState(['question', 'question']);
  const [status, setStatus] = useState(['Choosing...', 'Choosing...']);
  const [roundsWon, setRoundsWOn] = useState([0, 0]);
  const [message, setMessage] = useState('Choose One');
  const [round, setRound] = useState(0);

  useEffect(() => {
    console.log('choice', choice);
  }, [choice]);

  const handleChoiceClick = (e) => {
    setChoice([e.target.value, choice[1]]);
  };

  return (
    <>
    { gameStatus === 'waiting' || gameStatus === 'starting' 
      ? <></> 
      : <div
        className={`
          d-flex
          flex-direction-column
          text-center
          align-items-center
        `} 
    >
      <h2>Round 1</h2>
      <p>First to 3 wins</p>
      <div
        className={`
          d-flex
          justify-content-between
          align-items-center
          mt-lg
          mb-lg
        `} 
        style={{
          width: '100%',
          minWidth: '360px',
        }}
      >
        <div>
          <h3>You</h3>
          <p className='mb-sm'>{ status[0] }</p>
          <RpsIcon icon={ choice[0] } />
          <p className='mt-sm'>Rounds won: 0</p>
        </div>
        <h3>VS</h3>
        <div>
          <h3>Opponent</h3>
          <p className='mb-sm'>{ status[1] }</p>
          <RpsIcon icon={ choice[1] } />
          <p className='mt-sm'>Rounds won: 0</p>
        </div>
      </div>

      <h4>{ message }</h4>
      <div 
        className={`
          mt-sm
          d-flex
          justify-content-between
        `}
        style={{
          width: '100%',
          maxWidth: '320px',
        }}
      >
        <Button 
          style={{ width: '100px' }}
          value='rock'
          onClick={ handleChoiceClick }
        >Rock</Button>
        <Button 
          style={{ width: '100px' }}
          value='paper'
          onClick={ handleChoiceClick }
        >Paper</Button>
        <Button 
          style={{ width: '100px' }}
          value='scissors'
          onClick={ handleChoiceClick }
        >Scissors</Button>
      </div>

      <Button
        style={{ width: '100px' }}
        className='mt-md'
        disabled={ choice[0] === 'question' }
      >Ready</Button>
    </div>
    }</>
    
  );
};

export default (props) => {
  const {
    username,
  } = props;

  const [gameStatus, setGameStatus] = useState('');

  const params = useParams();
  const gameName = params.gameName

  useEffect(() => {
    (async () => {
      try {
        // join game
        const { success, message } = await joinGame(gameName, username);

        console.log(message);
        if (success) {
          setGameStatus('waiting');
          socket = io('ws://localhost:8080/');

          socket.emit(`${ gameName }: player joined`, username);
          socket.on(`${ gameName }: player joined`, (newUsername) => {
            if (username !== newUsername) {
              console.log(`${ newUsername } has joined the game`);
              setGameStatus('starting');
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    })();
    return () => {
      // leave game
      socket.disconnect();
    }
  }, [])

  // const [choices, setChoices] = useState([]);
  // const [icons, setIcons] = useState([]);

  // useEffect(() => {
  //   if (choices.length > 0) {
  //     const [userChoice, randomChoice] = choices;
  //     setIcons(choices);
  //     const winner = determineWinner(userChoice, randomChoice);
  //     console.log(winner);
  
  //     if (winner === 0) {
  //       setMessage('It\s a Tie.');
  //     } else if (winner === 1) {
  //       setMessage('You Won!');
  //     } else if (winner === 2) {
  //       setMessage('You Lost...');
  //     }

  //     setChoices([]);
  //   }

  // }, [choices]);

  return (
    <Page>
      <Lobby 
        gameStatus={ gameStatus } 
        setGameStatus={ setGameStatus } 
      />
      <Game
        gameStatus={ gameStatus } 
        setGameStatus={ setGameStatus } 
      />
    </Page>
  );
}