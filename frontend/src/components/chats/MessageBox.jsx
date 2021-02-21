import {
  Attachment as AttachmentIcon,
  Send as SendIcon,
} from '@material-ui/icons';

const MessageBox = () => {
  return (
    <div className="w-100 mx-4">
      <div className="row d-flex mx-4 mt-3 message-box">
        <div className="col-1 d-flex justify-content-center align-items-center">
          <AttachmentIcon />
        </div>

        <div className="message-input col-10 d-flex justify-content-center align-items-center">
          <textarea className="message-text border-0"> type message here ...</textarea>
        </div>

        <div className="col-1 d-flex justify-content-center align-items-center">
          <SendIcon />
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
