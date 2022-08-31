import { useEffect, useState } from 'react';
import {
  Page,
  Button,
} from '../../components';
import { useNavigate } from 'react-router';

export default (props) => {
  const {
    username,
  } = props;

  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    gameName: '',
    gameType: 'public',
    gamePassword: '',
    gameRounds: 3,
  });

  useEffect(() => {
    // Clear password input when radio is set to public.
    if (inputValues.gameType === 'public') {
      setInputValues({ 
        ...inputValues, 
        gamePassword: '',
      });
    }
  }, [inputValues.gameType]);

  useEffect(() => {
    if (username === '') 
      navigate('/start', { replace: true });
  }, [username]);

  const handleChange = (e) => { 
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new URLSearchParams(new FormData(e.target));

    fetch('/api/new', {
      method: 'POST',
      body: formData,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => res.json(res))
    .then(data => {
      if (data.success) {
        navigate(`/games/${ inputValues.gameName }`, { replace: true });
      } else {
        console.error(data.message);
      }
    }).catch(console.log);

  }

  return (
    <Page>
      <div
        className={`
          bg-white
          border-radius-xs
          p-md
          box-shadow-md
        `}
      >
        <h2>New Game</h2>
        <p>Choose settings for the new game.</p>
        <form
          // action='/new'
          // method='post'
          onSubmit={ handleSubmit }
          className={`
            mt-sm
            d-flex 
            flex-direction-column
          `} 
        >
          <label htmlFor='gameNameInput'>Name</label>
          <input 
            id='gameNameInput'
            name='gameName'
            value={ inputValues.gameName }
            onInput={ handleChange }
            type='text' 
            placeholder='Enter a name'
            className={`
              border-radius-xs
              p-xs
              mb-sm
            `}
            style={{ outline: 'none', border: '1px solid rgba(0,0,0,0.25)' }}
            required
          />

          <label htmlFor='gameRoundsInput'>Rounds</label>
          <input 
            id='gameRoundsInput'
            name='gameRounds'
            value={ inputValues.gameRounds }
            onInput={ handleChange }
            type='number' 
            min={ 1 }
            max={ 10 }
            className={`
              border-radius-xs
              p-xs
            `}
            style={{ outline: 'none', border: '1px solid rgba(0,0,0,0.25)' }}
            required
          />

           <div
            className={`
              d-flex
              mv-sm
            `}
           >
            <label className='mr-md'><input 
              id='publicGameRadio'
              name='gameType'
              type='radio' 
              value='public'
              onChange={ handleChange }
              defaultChecked
            />&nbsp; Public</label>

            <label><input
              id='publicGameRadio'
              name='gameType'
              type='radio'
              value='private'
              onChange={ handleChange }
            />&nbsp; Private</label>
         </div>

         <label htmlFor='gameNameInput'>Password</label>
          <input 
            id='gamePasswordInput'
            name='gamePassword'
            type='password' 
            value={ inputValues.gamePassword }
            onInput={ handleChange }
            placeholder='Enter a password'
            className={`
              border-radius-xs
              p-xs
              mb-md
            `}
            style={{ outline: 'none', border: '1px solid rgba(0,0,0,0.25)' }}
            disabled={ inputValues.gameType === 'public' }
          />
          <input
            name='hostUsername'
            value={ username }
            hidden
          />
          <Button
            disabled={ 
              inputValues.gameName === '' ||
              (inputValues.gameType === 'private' &&
              inputValues.gamePassword.length < 6)
            }
          >Submit</Button>
        </form>
      </div>
    </Page>
  );
};

