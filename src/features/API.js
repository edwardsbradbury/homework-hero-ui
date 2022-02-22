import Axios from 'axios';

export default () => {
    
  return Axios.create({
      baseURL: 'https://homework-hero-api.herokuapp.com/',
      withCredentials: true
  })
}