import React, { useState, useRef, useEffect } from 'react';
import { Bot, SendHorizonal } from 'lucide-react';
import { marked } from 'marked';

const Chatbot = ({ userName, summary }) => {
  const [chatLog, setChatLog] = useState([
    {
      type: 'bot',
      text: marked.parse(`Hi ${userName || 'Eco Warrior'}! 🌍 Ask me anything about your carbon impact!`),
    },
  ]);
  const [userMessage, setUserMessage] = useState('How can I reduce my carbon footprint?');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  useEffect(() => {
    sendMessage();
  }, []);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const newUserMessage = { type: 'user', text: userMessage };
    setChatLog((prev) => [...prev, newUserMessage]);
    setUserMessage('');
    setLoading(true);

    try {
      const res = await fetch(
        'https://chatbot.studentdiwan.com:5678/webhook/ddd0cea9-0bf8-4010-8217-28c399069c18/chat',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: '4706c4b07fe741788205f43b3344645b',
            action: 'sendMessage',
            chatInput: newUserMessage.text,
            systemPrompt: `You are EcoTrack Bot, a friendly AI assistant and always give response in very short. Based on the user's daily carbon footprint data below, offer helpful tips in a warm tone. Here's the data:\n${JSON.stringify(summary, null, 2)}`,
          }),
        }
      );

      const data = await res.json();
      const botResponse = marked.parse(data?.output || "Sorry, I couldn't understand that.");

      setChatLog((prev) => [...prev, { type: 'bot', text: botResponse }]);
    } catch (err) {
      const errorMsg = marked.parse("❌ Failed to connect. Please try again later.");
      setChatLog((prev) => [...prev, { type: 'bot', text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="h-[50vh] flex flex-col bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <Bot className="text-green-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">EcoTrack ChatBot Assistant</h3>
      </div>
  
      {/* 🧠 Chat Area Now Flexible */}
      <div className="flex-1 overflow-y-auto bg-gray-50 rounded-md p-4 space-y-3 text-sm text-gray-700 font-medium">
        {chatLog.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl w-max max-w-[80%] ${
              msg.type === 'bot'
                ? 'bg-green-100'
                : 'bg-white border ml-auto text-right'
            }`}
          >
            {msg.type === 'bot' ? (
              <div
                className="prose prose-sm"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ) : (
              msg.text
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
  
      {/* 🧠 Input Fixed at Bottom */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-60"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
  
      <div className="mt-2 text-xs text-gray-400 text-right">Powered by EcoTrack AI</div>
    </div>
  );
  
};

export default Chatbot;
