import Chatroom from '../../components/chatrooms/Chatroom';

const Groups = () => {
  return (
    <>
      <div className="container d-flex justify-content-center">
        <h3>CHAT ROOMS</h3>
      </div>
      <div className="container d-flex flex-column align-items-center">
        <Chatroom />
        <Chatroom />
        <Chatroom />
        <Chatroom />
        <Chatroom />
      </div>
    </>
  );
};

export default Groups;
