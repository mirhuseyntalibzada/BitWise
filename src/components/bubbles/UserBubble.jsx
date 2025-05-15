const UserBubble = ({ message, time }) => {
  return (
    <div className="bubble user">
      <div className="message-content">
        <p>{message}</p>
      </div>
      <span className="time">{time}</span>
    </div>
  )
}

export default UserBubble