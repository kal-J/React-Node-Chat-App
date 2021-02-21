import Axios from 'axios';

const endpoint = 'http://localhost:5000';

const getAllUsers = (accessToken) => {
  return new Promise((resolve, reject) => {
    Axios.get(`${endpoint}/api/v1/users`, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export default getAllUsers;