// The basic landing page displayed when soembody accesses Homework Hero without a logged in session

import React from 'react';
import { useDispatch } from 'react-redux';
import { changeMode } from '../features/home';

function Splash() {
  const dispatch = useDispatch();
  return (
    <div id='splash'>
      <h1>Struggling with your homework?</h1>
      <p>Do you have nobody you can ask for help?</p>

      <p>We can match you with tutors who will soon help
      you get back on track. Whether you would prefer
      to post a question and let tutors find you, or you’d
      rather search for tutors yourself, we have somebody
      who will help.</p>

      <p>If you’re looked-after by your local authority and extra
      tuition will help you achieve a goal in your Personal
      Education Plan, your school may even pay for 10-12
      lessons.</p>
      <img id='splashBg' src={require('../assets/splash_bg.jpeg')} alt='Girl at desk with textbooks and notepad, looking frustrated'></img>
      <h2>Don't despair, we can help!</h2>
      <button onClick={() => {dispatch(changeMode('register'))}}>Get help</button>
    </div>
  )
}

export default Splash;