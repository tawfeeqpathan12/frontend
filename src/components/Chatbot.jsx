import React, { useState, useRef, useEffect } from 'react';
import { Bot, SendHorizonal, Leaf, Sparkles, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { marked } from 'marked';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const Chatbot = ({ userName, summary }) => {
  const [chatLog, setChatLog] = useState([
    {
      id: Date.now(),
      type: 'bot',
      text: marked.parse(`Hi ${userName || 'Eco Warrior'}! 🌱 I'm your EcoTrack Assistant. Ask me anything about your carbon footprint!`),
      timestamp: new Date().toISOString()
    },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const quickQuestions = [
    "How can I reduce my carbon footprint?",
    "What's my biggest impact area?",
    "Suggest eco-friendly alternatives",
    "Explain my carbon report"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isMobile) {
      setIsMinimized(true);
    }
  }, [isMobile]);

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const sendMessage = async (message = userMessage) => {
    if (!message.trim()) return;

    const newUserMessage = { 
      id: Date.now(),
      type: 'user', 
      text: message,
      timestamp: new Date().toISOString()
    };
    
    setChatLog(prev => [...prev, newUserMessage]);
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
            systemPrompt: `You are EcoTrack Bot, a friendly AI assistant that helps users understand and reduce their carbon footprint. 
              Respond conversationally in 1-3 short paragraphs. Use emojis where appropriate. 
              Based on the user's data: ${JSON.stringify(summary, null, 2)}`,
          }),
        }
      );

      const data = await res.json();
      const botResponse = marked.parse(data?.output || "Sorry, I couldn't process that request. Could you try asking differently?");

      setChatLog(prev => [...prev, { 
        id: Date.now(),
        type: 'bot', 
        text: botResponse,
        timestamp: new Date().toISOString()
      }]);
    } catch (err) {
      setChatLog(prev => [...prev, { 
        id: Date.now(),
        type: 'bot', 
        text: marked.parse("⚠️ I'm having trouble connecting. Please check your internet and try again."),
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
  className={`fixed flex flex-col z-50 ${
    isMinimized
      ? 'bottom-4 right-4 w-16 h-16'
      : isMobile
      ? 'inset-0 m-2 h-[95vh]'
      : 'bottom-6 right-6 w-full max-w-md h-[600px]'
  }`}
>

      {isMinimized ? (
        <button 
          onClick={() => setIsMinimized(false)}
          className="w-full h-full bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl flex items-center justify-center animate-bounce"
          aria-label="Open chat"
        >
          <Bot size={32} />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex-1 flex flex-col bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden ${isMobile ? 'mx-2' : ''}`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Bot size={24} />
              <h3 className="text-lg font-bold">EcoTrack Assistant</h3>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setChatLog([{
                  id: Date.now(),
                  type: 'bot',
                  text: marked.parse(`Hi again ${userName || 'Eco Warrior'}! 🌍 What would you like to know about your carbon footprint today?`),
                  timestamp: new Date().toISOString()
                }])}
                className="p-1 rounded-full hover:bg-green-700 transition-colors"
                title="Start new chat"
                aria-label="New chat"
              >
                <Sparkles size={20} />
              </button>
              <button 
                onClick={() => setIsMinimized(true)}
                className="p-1 rounded-full hover:bg-green-700 transition-colors"
                title="Minimize"
                aria-label="Minimize chat"
              >
                <Minimize2 size={20} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <AnimatePresence initial={false}>
              {chatLog.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-3 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex-shrink-0 mt-1 ${msg.type === 'user' ? 'ml-2' : 'mr-2'}`}>
                      {msg.type === 'user' ? (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <User size={16} className="text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Bot size={16} className="text-green-600" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-xl ${
                        msg.type === 'bot'
                          ? 'bg-white border border-green-100 shadow-sm'
                          : 'bg-blue-50 border border-blue-100'
                      }`}
                    >
                      {msg.type === 'bot' ? (
                        <div
                          className="prose prose-sm prose-green max-w-none"
                          dangerouslySetInnerHTML={{ __html: msg.text }}
                        />
                      ) : (
                        <div className="text-gray-800">{msg.text}</div>
                      )}
                      <div className={`text-xs mt-1 ${msg.type === 'bot' ? 'text-gray-500' : 'text-blue-500'} text-right`}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </AnimatePresence>
          </div>

          {/* Quick Questions */}
          {chatLog.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="text-xs text-gray-500 mb-1">Try asking:</div>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(question)}
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-800 px-3 py-1 rounded-full border border-green-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your carbon impact..."
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                disabled={loading}
                autoFocus
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !userMessage.trim()}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                  loading || !userMessage.trim()
                    ? 'text-gray-400'
                    : 'text-white bg-green-500 hover:bg-green-600'
                }`}
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <SendHorizonal size={18} />
                )}
              </button>
            </div>
            <div className="text-xs text-gray-400 text-center mt-1">
              Powered by EcoTrack AI • <Leaf size={12} className="inline" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;