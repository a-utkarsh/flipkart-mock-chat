import React, {useState, useEffect} from "react";
import moment from 'moment';

function ChatView ({chat}) {

	const [newMessage, setNewMessage] = useState ('');
	const [messages, setMessages] = useState([]);


	const {imageURL, title, messageList} = chat;

	useEffect (() => {
		setMessages (messageList);
	}, [messageList] )


	const getMessageStyle = (sender) => {
		if (sender === 'BOT') {
			return {
				backgroundColor : '#fff',
			}
		}
		return {
			backgroundColor : '#027cd5',
			color : '#fff'
		}
	}

	const onSendMessage = () => {
		if (!newMessage || newMessage.trim() === "") {
			return;
		}
	}

	const handleMessageChange = (event) => {
		setNewMessage (event.currentTarget.value);
	}

	return (
		<div className = 'chatView-container'>
			<div className="header chatView-header">
				<div className='chatBox-avatar-container'>
					<img src={imageURL} alt='chat-img' className='chatBox-avatar' />
				</div>
				<div className = 'chatView-header-title-container'>
					<h3>{title}</h3>
				</div>
			</div>
			<div className="chatView-chat-container">
				{messages.map (message => (
					<div key = {message.messageId} style = {{display: 'flex', justifyContent : message.sender === 'BOT' ? 'start' : 'end' }}>
						<div className='chat-message' style = {getMessageStyle (message.sender)}>
							<div>{message.message}</div>
							<h6> {moment(message.timestamp).format('hh:mm')}</h6>
						</div>
					</div>
				))}
			</div>

			<div className="chatView-chat-input-container">
				<input className="chatView-chat-input" placeholder="Type a message..." onChange={handleMessageChange}/>				
				<button className="send-button" onClick = {onSendMessage}>Send</button>
			</div>
		</div>
	)
}

export default ChatView;