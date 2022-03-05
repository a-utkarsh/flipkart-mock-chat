import React, { useEffect, useState } from 'react';
import ChatBox from '../atoms/ChatBox';

const CHAT_URL = 'https://my-json-server.typicode.com/codebuds-fk/chat/chats';

function  MainView ({onChatOpen}) {

	const [chats, setChats] = useState ([]);
	const [search, setSearch] = useState ('');
	const [filteredChat, setFilteredChat ] = useState ([]);
	const [opened, setOpened] = useState('');

	useEffect (() => {
		getChats ();
	}, [])

	const getChats = async() => {
		let result;
		try {
			let response = await fetch(CHAT_URL);
			result = await response.json();
		}
		catch (err) {
			console.error(err);
			return;
		}
		setChats (result);
	}

	const handleChatOpen = (chat) => {
		setOpened (chat.id);
		onChatOpen (chat);
	}


	const handleSearch = (event) => {
		let searchVal = event.target.value;
		if (!searchVal) {
			setSearch ('');
			setFilteredChat ([]);
			return;
		}
		let _filtered = [];
		chats.forEach(element => {
			if (element.orderId.toLowerCase().includes(searchVal.toLowerCase()) || element.title.toLowerCase().includes (searchVal.toLowerCase())) {
				_filtered.push (element)
			}
		});
		setSearch (searchVal);
		setFilteredChat (_filtered);
	}

	const chatsList = search ? filteredChat : chats;

	return (
		<div className='main-view'>
			<div className='header'>
				<h4>Filter by title/Order ID</h4>
				<input placeholder='Start typing to search'  value = {search} className='search-input' onChange={handleSearch}/>
			</div>
			<div>
				{chatsList.map (chat => (
					<ChatBox 
						chat = {chat}
						onChatClick = {handleChatOpen}
						key = {chat.id}
						opened = {chat.id === opened ? true : false}
					/>
				))}
			</div>
		</div>
	)
}

export default MainView;