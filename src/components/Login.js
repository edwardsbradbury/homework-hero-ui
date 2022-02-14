import React from 'react';
import {useDispatch} from 'react-redux';

function Login() {
  return (
    <div id='Login'>
      <form onSubmit={this.login}>
        <input type='text' value='' onChange={this.handleChange} />
        <button></button>
        <input type='submit' value='Login'/>
      </form>
    </div>
  );
}