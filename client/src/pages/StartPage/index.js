import { useEffect, useState, } from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { 
  Page,
  Button,
} from "../../components";

export default (props) => {
  const navigate = useNavigate();
  const {
    username,
    setUsername,
  } = props;

  const [inputValues, setInputValues] = useState({
    usernameInput: '',
  });

  const handleChange = e => {
    setInputValues({
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setUsername(inputValues.usernameInput);
  }, [inputValues.usernameInput]);

  return (
    <Page>
      <h2>Welcome to Rock, Paper, Scissors!</h2>
      <p>Enter a username to get started.</p>
      <input 
        id='usernameInput'
        name='usernameInput'
        value={ inputValues.usernameInput }
        onInput={ handleChange }
        type='text' 
        placeholder='Enter a username'
        className={`
          mt-sm
          border-radius-xs
          p-xs
          mb-sm
        `}
        style={{ outline: 'none', border: '1px solid rgba(0,0,0,0.25)' }}
        required
      />
      <Button
        onClick={ () => navigate('/', { replace: true }) } 
        disabled={ username === '' }
      >Continue</Button>
    </Page>
  );
};