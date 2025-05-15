import { useContext } from "react"
import { HamMenuContext } from "../contexts/HamMenuContext"
import Bubble from "./Bubble"
import MessageBox from './MessageBox'

const Chat = () => {
    const [hamMenu] = useContext(HamMenuContext)

    return (
        <section className={`chat ${hamMenu ? 'open' : 'close'}`}>
            <div className="chat-container">
                <Bubble />
            </div>
            <MessageBox />
        </section>
    )
}

export default Chat