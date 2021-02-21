import Axios from 'axios';

const endpoint = 'http://localhost:5000';

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
