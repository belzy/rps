import React, { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import {
  Select,
  Button,
  Page,
} from '../../components';
import style from './style';

const AvailableGames = (props) => {
  const {
    onGameSelect,
  } = props;

  const [games, setGames] = useState([]);
  const [selectOptions, setSelectOptions] = useState([])

  const [selectValue, setSelectValue] = useState('');

  useEffect(() => {
    onGameSelect(selectValue);
  }, [selectValue]);

  useEffect(() => {
    // Get games list
    fetch('/api/games', {
      method: 'get',
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      setGames(data);
    }).catch(console.log);
  }, []);

  useEffect(() => {
    setSelectOptions(games.map(({ name }) => 
      ({ text: name, value: name})));
  }, [games]);

  return (
    <>
      <h2
        className={`
          text-center
        `}
      >Available Games</h2>
      <p
        className={`
          mb-sm
          text-center
        `}
      >Join a game or create a new one.</p>
      <Select
        size={ 5 }
        onChange={ e => setSelectValue(e.target.value) }
        options={ selectOptions }
        style={ style }
      />
    </>
  );
};

const GameButtons = (props) => {
  const {
    selectedGame,
  } = props;

  const navigate = useNavigate();
  
  return (
    <div
      className={`
        d-flex
        justify-content-around 
        mt-sm
      `} 
    >
      <Link to='/new'>
        <Button
        >New Game</Button>
      </Link>

      <Button
        disabled={ selectedGame === '' }
        onClick={ () => navigate(`/games/${ selectedGame }`, { replace: true }) }
      >Join Game</Button>
    </div>
  );
};

export default (props) => {
  const {
    username,
  } = props;

  const [selectedGame, setSelectedGame] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
      if (username === '') 
        navigate('/start', { replace: true });
  }, [username]);

  return (
    <Page>
      <div>
        <AvailableGames
          onGameSelect={ setSelectedGame } 
        /> 
        <GameButtons 
          selectedGame={ selectedGame }  
        />
      </div>
    </Page>
  );
}