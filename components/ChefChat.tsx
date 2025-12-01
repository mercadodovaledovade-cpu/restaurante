import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';
import { Send, User, Bot, Sparkles } from 'lucide-react';

const ChefChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Eu sou o Chef SaborIA. 👨‍🍳 Em que posso ajudar na cozinha hoje? Dúvidas sobre temperos, substituições ou dicas de cozimento?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await sendChatMessage(history, userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-100px)] flex flex-col">
      <div className="bg-white rounded-3xl shadow-xl flex-grow flex flex-col overflow-hidden border border-orange-100">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-chef-600 to-red-600 p-4 text-white flex items-center gap-3 shadow-md">
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
             <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Chef SaborIA</h3>
            <div className="flex items-center gap-2 text-xs text-orange-100">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online e pronto para cozinhar
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-orange-50/30">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`
                  w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm
                  ${msg.role === 'user' ? 'bg-gray-800 text-white' : 'bg-white text-chef-600 border border-chef-100'}
                `}>
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                
                <div className={`
                  p-4 rounded-2xl shadow-sm leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-chef-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}
                `}>
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                  ))}
                  <p className={`text-[10px] mt-2 opacity-60 text-right ${msg.role === 'user' ? 'text-white' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start w-full">
               <div className="flex max-w-[80%] gap-3 flex-row">
                 <div className="w-10 h-10 rounded-full bg-white text-chef-600 border border-chef-100 flex-shrink-0 flex items-center justify-center shadow-sm">
                    <Sparkles size={18} className="animate-spin-slow" />
                 </div>
                 <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-chef-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-chef-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-chef-400 rounded-full animate-bounce delay-200"></div>
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre receitas, dicas ou ingredientes..."
              className="flex-grow p-4 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-chef-200 focus:outline-none transition-all placeholder-gray-400"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-chef-600 text-white p-4 rounded-xl hover:bg-chef-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-chef-200"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChefChat;