import { useContext } from "react"
import { HamMenuContext } from "../contexts/HamMenuContext"
import { ChatContext } from "../contexts/ChatContext"
import Bubble from "./Bubble"
import MessageBox from './MessageBox'
import { BeatLoader } from 'react-spinners'

const Chat = () => {
    const [hamMenu] = useContext(HamMenuContext)
    const { isLoading, isStreaming } = useContext(ChatContext)

    return (
        <section className={`chat ${hamMenu ? 'open' : 'close'}`}>
            <div className="chat-container">
                <Bubble />
                {isLoading && !isStreaming && (
                    <div className="typing-indicator">
                        <BeatLoader size={10} color="#00b1bc" />
                    </div>
                )}
            </div>
            <MessageBox />
        </section>
    )
}

export default Chat