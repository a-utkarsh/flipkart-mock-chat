import React from 'react';
import moment from 'moment';

function ChatBox ({chat, onChatClick, opened}) {

	const {title, orderId, imageURL, latestMessageTimestamp, messageList} = chat;

	const handleClick = () => {
		onChatClick (chat);
	}

	return (
		<div className='chat-box' onClick = {handleClick} style = {{background : opened ? '#f0f0f0' : ''}}>
			<div className='chatBox-avatar-container'>
				<img src={imageURL} alt='chat-img' className='chatBox-avatar' />
			</div>
			<div className='chatBox-content-container'>
				<h4>{title}</h4>
				<h5>{orderId}</h5>
				<h6>{messageList[messageList.length-1]?.message}</h6>
			</div>
			<div className='chatBox-time-container'>
				{moment (latestMessageTimestamp).format ('DD/MM/YYYY')}
			</div>
		</div>
	)
}

export default ChatBox;