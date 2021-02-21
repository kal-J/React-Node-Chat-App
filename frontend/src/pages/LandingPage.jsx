import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h2 className="my-4">CHAT APP</h2>
      <Link to="/login" style={{ textDecoration: 'none', color: '#fff' }}>
        <Button variant="contained" color="primary">
          <Typography>LOGIN TO START CHATTING</Typography>
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;
