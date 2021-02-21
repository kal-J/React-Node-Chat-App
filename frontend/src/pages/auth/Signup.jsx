import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import signup from '../../api/signup';

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  return (
    <div className="container mt-3">
      <form
        className="needs-validation"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            user.username &&
            user.email &&
            user.password === user.confirm_password
          ) {
            signup(user)
              .then(() => {
                setError('');
                history.push('/login');
              })
              .catch((error) => {
                const message = error.data.message;
                setError(message);
              });
          } else {
            setError('Error in Input fields, check your inputs and try again');
          }
        }}
      >
        <div className="row">
          <h3>SIGN UP</h3>
        </div>
        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div class="mt-3">
          <label htmlFor="username" class="form-label">
            Username
          </label>
          <input
            type="text"
            class="form-control"
            id="username"
            value={user.username || ''}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
        </div>

        <div class="mt-3">
          <label htmlFor="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={user.email || ''}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div class="mt-3">
          <label htmlFor="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            value={user.password || ''}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>

        <div class="mt-3">
          <label htmlFor="confirm-password" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="confirm-password"
            placeholder="confirm password"
            value={user.confirm_password || ''}
            onChange={(e) =>
              setUser({ ...user, confirm_password: e.target.value })
            }
            required
          />
        </div>

        <div className="mt-3">
          <input
            type="submit"
            value="SIGN UP"
            className="form-control btn btn-primary mt-3"
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
