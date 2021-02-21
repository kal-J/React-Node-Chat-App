import { Link } from 'react-router-dom';
import './style.scss';

const Chat = () => {
  return (
    <Link to="/chats/1" style={{ textDecoration: 'none', color: '#000' }}>
      <div className="row mt-2">
        <div className="d-flex chat">
          <div className="col-3 d-flex flex-column justify-content-center ">
            <div className="avatar"></div>
          </div>
          <div className="col-9">
            <div className="d-flex justify-content-between col-12 mt-2">
              <div>Name...</div>
              <div>Date</div>
            </div>
            <div className="col-12 mt-2">latest message ....</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Chat;
