import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MobileRightMenuSlider from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {
  AppBar,
  Toolbar,
  ListItem,
  IconButton,
  ListItemText,
  Divider,
  List,
  Typography,
  Box,
} from '@material-ui/core';
import { AppContext } from '../context';

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const menuItems = [
  {
    listText: 'CHATS',
    path: '/chats',
  },
  {
    listText: 'CHAT ROOMS',
    path: '/chat-rooms',
  },
  {
    listText: 'MEMBERS',
    path: '/members',
  },
  {
    listText: 'SETTINGS',
    path: '/settings',
  },
];

const SideBar = (props) => {
  const [state, setstate] = useState({
    left: false,
  });
  const toggleSlider = (slider, open) => {
    setstate({ ...state, [slider]: open });
  };
  const classes = useStyles();
  const {
    state: {
      user: { isAuthenticated },
    },
    setState,
  } = useContext(AppContext);

  const sideList = (slider) => (
    <Box className={classes.menuSliderContainer} component="div">
      <Divider />

      <List>
        {menuItems.map((item, key) => (
          <Link
            style={{ textDecoration: 'none' }}
            key={key}
            to={item.path}
            onClick={() => toggleSlider('left', false)}
          >
            <ListItem button>
              <ListItemText primary={item.listText} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box component="nav">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => toggleSlider('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link style={{ textDecoration: 'none', color: '#fff' }} to="/">
                CHAT APP
              </Link>
            </Typography>

            {!isAuthenticated ? (
              <>
                <Button color="inherit">
                  <Link
                    to="/login"
                    style={{ textDecoration: 'none', color: '#fff' }}
                  >
                    Login
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/signup"
                    style={{ textDecoration: 'none', color: '#fff' }}
                  >
                    Signup
                  </Link>
                </Button>
              </>
            ) : (
              <Button color="inherit">
                <Link
                  to="/logout"
                  style={{ textDecoration: 'none', color: '#fff' }}
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem('user');
                    setState({ ...state, user: {} });
                  }}
                >
                  Logout
                </Link>
              </Button>
            )}

            <MobileRightMenuSlider
              anchor="left"
              open={state.left}
              onClose={() => toggleSlider('left', false)}
            >
              {sideList('left')}
            </MobileRightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default SideBar;
