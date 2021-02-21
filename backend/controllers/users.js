const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schema = require('../validation/userJoiSchema');

let users = fs.readFileSync(path.join(__dirname, '../db/users.json'), 'utf-8');

users = JSON.parse(users) || [];

module.exports = {
  add: (req, res) => {
    try {
      let { username, email, password, confirm_password } = req.body;
      console.log('SIGNUP', username, email, password, confirm_password);
      const { value, error } = schema.validate({
        username,
        email,
        password,
        confirm_password,
      });

      if (error) {
        console.log(error);
        return res.status(400).send({ message: error.message });
      }

      const userExists = users.filter((user) => user.email === email).length;

      if (userExists) {
        return res
          .status(400)
          .send({ message: 'User with this email Already exits' });
      }
      // hash password
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          users.push({
            username,
            email,
            password: hash,
            createdAt: Date.now(),
          });

          fs.writeFile(
            path.join(__dirname, '../db/users.json'),
            JSON.stringify(users),
            (err) => {
              // throws an error, you could also catch it here
              if (err) throw err;
              res.status(200).send({ message: 'success' });

              // success case, the file was saved
              console.log('user saved');
            }
          );
        })
        .catch((err) => {
          return res
            .status(500)
            .send({ message: 'Server error, Something went wrong' });
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Sorry, something went wrong' });
    }
    return;
  },

  login: (req, res) => {
    const { email, password } = req.body;
    console.log('LOGIN', email, password);

    let result = {};
    let status = 200;
    if (!email || !password)
      return res
        .status(400)
        .send({ message: 'Invalid Email or Password provided' });
    const user = users.filter((user) => user.email === email)[0];
    if (!user)
      return res
        .status(400)
        .send({ message: 'Provided email is not registered' });

    //  compare passwords
    bcrypt
      .compare(password, user.password)
      .then((match) => {
        if (match) {
          // Create a token
          const payload = { email: user.email, username: user.username };
          const options = { expiresIn: '2d', issuer: 'localhost' };
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign(payload, secret, options);

          result.token = token;
          result = { ...result, email: user.email, username: user.username };
        } else {
          status = 401;
          result.message = 'Authentication error, password is incorrect';
        }
        return res.status(status).send(result);
      })
      .catch((err) => {
        status = 500;
        result.message = err.message;
        return res.status(status).send(result);
      });
  },
  getAll: (req, res) => {
    try {
      return res.send(users);
    } catch (error) {
      res.status(500).send({ message: 'Sorry, something went wrong' });
    }
  },
};
