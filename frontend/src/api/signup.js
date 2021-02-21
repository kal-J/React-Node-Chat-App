import Axios from 'axios';

const endpoint = 'http://localhost:5000';

const signup = (data) => {
  return new Promise((resolve, reject) => {
    Axios.post(`${endpoint}/api/v1/users`, data)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((err) => reject(err.response));
  });
};

export default signup;
