const MessageWindow = ({ msgs, additionalClasses }) => {
  return (
    <div className={"msg-window " + additionalClasses}>
      {msgs.map((msg, idx) => (
        <p key={idx}>{msg}</p>
      ))}
    </div>
  );
};

export default MessageWindow;
