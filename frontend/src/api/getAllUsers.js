import Axios from 'axios';


const endpoint = 'https://lan-chat-app.herokuapp.com';

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