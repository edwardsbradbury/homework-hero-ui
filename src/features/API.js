/* A configured Axios ready for dispatching HTTP requests to my API used in the Login & Register
    components and most of the reducers in this directory */

import Axios from 'axios';

const API = () => {
    
  return Axios.create({
      // Spare me the repetitive typing out of API address
      baseURL: 'https://homework-hero-api.herokuapp.com/',
      // If there's a secure session cookie for my API in the user's browser, inlude with HTTP requests
      withCredentials: true
  })
}

export default API;