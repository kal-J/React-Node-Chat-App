import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Chats from './pages/chats';
import ChatMessages from './pages/chats/ChatMessages';
import Chatrooms from './pages/chatrooms';
import LandingPage from './pages/LandingPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import { AppContext } from './context';
import MembersList from './pages/members/MembersList';

const Routes = () => {
  const {
    state: {
      user: { isAuthenticated },
    },
  } = useContext(AppContext);
  const history = useHistory();

  return (
    <>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />

      <Route
        exact
        path="/chat-rooms"
        render={() => {
          if (!isAuthenticated) return history.push('/login');
          return <Chatrooms />;
        }}
      />
      <Route
        exact
        path="/chat-rooms/:id"
        render={() => {
          if (!isAuthenticated) return history.push('/login');
          return <ChatMessages />;
        }}
      />
      <Route
        exact
        path="/chats"
        render={() => {
          if (!isAuthenticated) return history.push('/login');
          return <Chats />;
        }}
      />
      <Route
        exact
        path="/chats/:id"
        render={() => {
          if (!isAuthenticated) return history.push('/login');
          return <ChatMessages />;
        }}
      />
      <Route
        exact
        path="/members"
        render={() => {
          if (!isAuthenticated) return history.push('/login');
          return <MembersList />;
        }}
      />
      <Route
        exact
        path="/members/:id"
        render={() => {
          if (!isAuthenticated) return history.push('/login');
          return <MembersList />;
        }}
      />
    </>
  );
};

export default Routes;
