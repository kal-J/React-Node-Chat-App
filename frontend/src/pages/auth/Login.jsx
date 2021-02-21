import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import login from '../../api/login';
import { AppContext } from '../../context';
import { connectToSocketIO } from '../../socket.io';

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  const { state, setState } = useContext(AppContext);

  return (
    <div className="container mt-3">
      <form
        className="needs-validation"
        onSubmit={(e) => {
          e.preventDefault();
          if (user.email && user.password) {
            login(user)
              .then((user) => {
                setError('');
                localStorage.setItem('user', JSON.stringify(user));
                setState({
                  ...state,
                  user: { ...user, isAuthenticated: true },
                });
                

                history.push('/chats');
              })
              .catch((err) => {
                const message = err.response.data.message;
                setError(message);
              });
          } else {
            setError('Error in Input fields, check your inputs and try again');
          }
        }}
      >
        <div className="row">
          <h3>Login</h3>
        </div>
        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}

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

        <div className="mt-3">
          <input
            type="submit"
            value="LOGIN"
            className="form-control btn btn-primary mt-3"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
