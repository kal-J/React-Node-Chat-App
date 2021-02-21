import Axios from 'axios';

const endpoint = 'https://lan-chat-app.herokuapp.com';

const login = (data) => {
  return new Promise((resolve, reject) => {
    Axios.post(`${endpoint}/api/v1/login`, data)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((err) => reject(err));
  });
};

export default login;
