const UserBubble = ({ message, time }) => {
    return (
      <div className="bubble assistant">
        <p>{message}</p>
        <span className="time">{time}</span>
      </div>
    )
  }
  
  export default UserBubble