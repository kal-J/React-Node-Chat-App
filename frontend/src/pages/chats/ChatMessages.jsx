import MessageBox from '../../components/chats/MessageBox';

const ChatMessages = () => {
  return (
    <div className="container">
      <div className="mx-4 chat-top-bar">
        <div className="container">
          <div className="w-100 d-flex flex-column p-2">
            <span>Name..</span>
            <span>Active status</span>
          </div>
        </div>
      </div>

      <div className="container chat-messages">
        <div className="d-flex justify-content-center my-3">Chat Date</div>

        <div className="d-flex justify-content-right row my-1 sent-message">
          <div className="message mx-2">sent message ....</div>
        </div>
        <div className="d-flex justify-content-right row my-1 sent-message">
          <div className="message mx-2">sent message ....</div>
        </div>
        <div className="d-flex justify-content-right row my-1 sent-message">
          <div className="message mx-2">sent message ....</div>
        </div>
        <div className="d-flex justify-content-right row my-1 sent-message">
          <div className="message mx-2">sent message ....</div>
        </div>
        <div className="d-flex justify-content-right row my-1 sent-message">
          <div className="message mx-2">sent message ....</div>
        </div>

        <div className="d-flex justify-content-right row my-1 received-message">
          <div className="message mx-4">received message ....</div>
        </div>
        <div className="d-flex justify-content-right row my-1 received-message">
          <div className="message mx-4">received message ....</div>
        </div>
        <div className="d-flex justify-content-right row my-1 received-message">
          <div className="message mx-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo et
            illum adipisci facilis dolor. Eligendi optio eveniet sequi eum
            debitis. Repudiandae, corporis? Autem, recusandae similique porro
            obcaecati atque quaerat quia?
          </div>
        </div>
      </div>

      <div className="row fixed">
        <MessageBox />
      </div>
    </div>
  );
};

export default ChatMessages;
