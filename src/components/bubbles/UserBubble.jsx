const UserBubble = ({ message, time }) => {
  return (
    <div className="bubble user">
      <p>{message}</p>
      <span className="time">{time}</span>
    </div>
  )
}

export default UserBubble