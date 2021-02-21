import Chat from '../../components/chats/Chat';
import './styles.scss';

const Chats = () => {
  return (
    <>
      <div className="container d-flex justify-content-center">
        <h3>CHATS</h3>
      </div>
      <div className="container d-flex flex-column align-items-center">
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
      </div>
    </>
  );
};

export default Chats;
