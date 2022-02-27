import Axios from 'axios';

const API = () => {
    
  return Axios.create({
      baseURL: 'https://homework-hero-api.herokuapp.com/',
      withCredentials: true
  })
}

export default API;