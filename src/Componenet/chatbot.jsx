// import React, { useEffect, useState } from 'react';
// import { socket } from '../socket';
// import { useGetMessagesQuery, useSendMessageMutation } from '../services/apiSlice';

// const ChatWidget = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [message, setMessage] = useState('');
//     const [liveMessages, setLiveMessages] = useState([]);

//     const { data: oldMessages = [] } = useGetMessagesQuery();
//     const [sendMessage] = useSendMessageMutation();

//     useEffect(() => {
//         socket.on('receive_message', (msg) => {
//             setLiveMessages((prev) => [...prev, msg]);
//         });

//         return () => socket.off('receive_message');
//     }, []);

//     const handleSend = async () => {
//         if (!message.trim()) return;

//         const msg = { content: message };

//         try {
//             await sendMessage(msg).unwrap(); // unwrap to catch errors
//             socket.emit('send_message', msg); // Send via socket too
//             setMessage('');
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     const allMessages = [...oldMessages, ...liveMessages];

//     return (
//         <>
//             {/* Floating Button */}
//             <div className="fixed bottom-5 right-5 z-50">
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
//                 >
//                     💬
//                 </button>
//             </div>

//             {/* Chat Box */}
//             {isOpen && (
//                 <div className="fixed bottom-20 right-5 w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col">
//                     <div className="p-3 bg-blue-600 text-white font-semibold rounded-t-lg">Live Chat</div>
//                     <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
//                         {allMessages.map((msg, idx) => (
//                             <div
//                                 key={idx}
//                                 className={`p-2 rounded-md max-w-[75%] ${msg.sender === 'You' ? 'bg-blue-100 ml-auto' : 'bg-gray-200'
//                                     }`}
//                             >
//                                 <strong>{msg.sender}: </strong>{msg.text}
//                             </div>
//                         ))}
//                     </div>
//                     <div className="p-2 border-t flex gap-2">
//                         <input
//                             type="text"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="flex-1 border rounded px-2 py-1 text-sm"
//                             placeholder="Type a message..."
//                             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//                         />
//                         <button onClick={handleSend} className="bg-blue-500 text-white px-3 rounded text-sm">
//                             Send
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default ChatWidget;
