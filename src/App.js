import React, {useState} from 'react';
import MainView from './components/molecules/MainView';
import ChatView from './components/molecules/ChatView';

import './App.css';

function App() {

  const [chat, setChat] = useState (null);

  const handleChatOpen = (_chat) => {
    if (chat && _chat.id === chat.id) {
      setChat (null);
      return;
    }
    setChat (_chat);
  }

  return (
    <div className="main-container">
      <div className = 'mainView-container'>
        <MainView onChatOpen={handleChatOpen} />
      </div>
      {chat ? <div className='chatView-container'>
        <ChatView chat={chat} />
      </div> : null}
    </div>
  );
}

export default App;
