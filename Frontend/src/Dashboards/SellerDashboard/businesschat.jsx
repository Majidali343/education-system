import React, { useRef,useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';


import Sidebar from "./Sidebar";

const ChatBusiness = ({ socket }) => {


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
  useEffect(() => {

    setUser_id(localStorage.getItem('user_id'));

  }, []);

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setchats] = useState('');

  const divRef = useRef(null);

  const scrollToBottom = () => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  };
  
  // Dummy chat data

  const getchats = async () => {
      try {
          const response = await fetch(`http://localhost:5000/chat/getchatsbusiness/${user_id}`);
          if (response.ok) {
              const data = await response.json();
              
              setchats(data.data);
              console.log(data.data)
          } else {
              console.error('Failed to fetch chats:', response.status);
          }
      } catch (error) {
          console.error('Error fetching chats:', error);
      }
  };

  useEffect(() => {
      getchats();
  }, []); //




  const handleChatSelection = (chatId) => {

      setSelectedChat(chatId);
      setInitialMessages(chatId)

  };

  const setInitialMessages = async (chatId) => {
      try {
          setMessages([]);
          const response = await fetch(`http://localhost:5000/chat/getmessages/${chatId}`);
          if (!response.ok) {
              throw new Error('Failed to fetch messages');
          }
          const data = await response.json();
          setMessages(data.data);

      } catch (error) {
          console.error('Error fetching messages:', error);
      }
  };

  const handleClick = () => {
  const inputValue = document.querySelector('input[type="text"]').value;
  sendMessage(inputValue, user_id);
  scrollToBottom();
  };
  
  
  useEffect(() => {
    socket.on('messageResponse', (data) => {
        if (data.selectedchat === selectedChat) {
         setMessages([...messages, data])
        }
    });
  }, [socket, messages]);
  
  const sendMessage = async (text, user_id) => {
    //   if (text.trim() !== '') {
    //       const newMessage = { id: messages.length + 1, sendermessage: user_id, message: text };
    //       setMessages([...messages, newMessage]);
    //   }

      socket.emit('message', {
        message: text,
        sendermessage: user_id,
        socketID: socket.id,
        selectedchat:selectedChat        

      });
      
      document.querySelector('input[type="text"]').value = '';
      const response = await fetch(`http://localhost:5000/chat/savemessage`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedChat, text ,user_id}),
      });

  }



  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`pt-[30px] w-[243px] rounded lg:pt-0 bg-green-600 text-white h-screen fixed top-0 left-0 overflow-y-auto transition-transform transform ${isSidebarOpen ? 'w-[300px]' : '-translate-x-full '
          } lg:translate-x-0`}
      >
        <Sidebar/>
      </aside>


      {/*Routing*/}
      <div className={`md:p-4 lg:ml-64 lg:md-64 lg:pl-0 w-65 sm:w-[100vw] mt-10 lg:mt-0 lg:w-[cal(100vw-243px)] m-auto `}>
      <div className="flex h-screen text-black bg-white">
            {/* Chat List */}
            <div className="w-1/4 shadow-lg ring-1 ring-black ring-opacity-5 ring-offset-4 ring-offset-white ">
                
                {chats ? 
                <>
                 {chats.map((chat) => (
                    <div key={chat.chatid} onClick={() => handleChatSelection(chat.chatid)} className="p-4 m-4 text-black rounded shadow-lg cursor-pointer hover:bg-grrounded-sm hover:bg-green-300 ring-1 ring-black ring-opacity-5 ring-offset-4 ring-offset-white">
                        <div className="font-semibold text-black ">{chat.First_name+' '+chat.last_name}</div>
                        <div className="text-black">{chat.message}</div>
                    </div>
                ))}
                </>
                :
                <>
                <h1 className='p-6 font-semibold' >No message found</h1>
                </>}
               
            </div>
            {/* Chat Window */}
            <div className="w-3/4 bg-[rgb(246 247 246)] bg-[#ece5dd]">
                <div ref={divRef} className="h-full overflow-y-scroll" style={{ maxHeight: 'calc(100vh - 5rem)' }}>
                    {selectedChat && (
                        <div>
                            {messages.map((message) => (

                                <div key={message.chatid} className={`p-2 ${message.sendermessage == user_id ? 'text-right' : 'text-left'}`}>

                                    <div className="inline-block max-w-xs p-2 text-white bg-green-500 rounded-lg">{message.message}
                                        {message.date_time ? (
                                            <div>{new Intl.DateTimeFormat('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            }).format(new Date(message.date_time))}</div>
                                        ) : (
                                            <div>{new Intl.DateTimeFormat('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            }).format(new Date())}</div>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {selectedChat ?
                    <div className="p-4 bg-green-200 shadow-lg ring-1 ring-black ring-opacity-5 ring-offset-4 ">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="p-2 border border-white rounded-l-lg w-[90%]"
                            // onKeyDown={(e) => {
                            //     if (e.key === 'Enter') {
                            //         sendMessage(e.target.value);
                            //         e.target.value = '';
                            //     }
                            // }}
                        />
                        <button onClick={handleClick} className="px-4 py-2 text-white bg-green-500 rounded-r-lg hover:bg-green-600 w-[10%]">
                            Send
                        </button>
                    </div>
                    :
                    <></>}
            </div>
        </div>


      </div>

      {/* Toggle Button (Visible only on small screens) */}
      <button
        className="fixed p-2 bg-green-500 rounded lg:hidden top-4 left-4"
        onClick={toggleSidebar}
      >
        <FaBars className="text-white" />

      </button>
    </div>
  );
};

export default ChatBusiness;
