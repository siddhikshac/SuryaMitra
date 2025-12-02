import React, { useState, useRef, useEffect } from 'react';
import { streamSolarChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! I am SuryaMitra. Ask me about solar costs, subsidies (PM Surya Ghar), or how to handle dust and heat for your panels.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Format history for Gemini API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const stream = await streamSolarChat(history, userMsg);
      
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullResponse += chunkText;
          setMessages(prev => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1].text = fullResponse;
            return newMsgs;
          });
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the sun right now. Please try again later.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex-grow bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-solar-50 border-b border-solar-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-solar-500 rounded-full flex items-center justify-center text-white">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">SuryaMitra Assistant</h2>
              <p className="text-xs text-slate-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Online
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-6 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                  msg.role === 'user' ? 'bg-solar-700 ml-2' : 'bg-solar-500 mr-2'
                }`}>
                  {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                </div>

                {/* Bubble */}
                <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed overflow-hidden ${
                  msg.role === 'user' 
                    ? 'bg-solar-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.isError ? (
                    <span className="text-red-500">{msg.text}</span>
                  ) : (
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0">
                      <ReactMarkdown 
                        components={{
                          strong: ({node, ...props}) => <span className={`font-bold ${msg.role === 'user' ? 'text-white' : 'text-solar-700'}`} {...props} />
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100 ml-10">
                 <Loader2 size={16} className="animate-spin text-solar-600" />
                 <span className="text-xs text-slate-400">Thinking...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cleaning, monsoons, or subsidies..."
              className="w-full pl-6 pr-14 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-solar-500 focus:border-solar-500 transition-all shadow-sm outline-none bg-white text-slate-900 placeholder-slate-400"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 p-2 bg-solar-500 text-white rounded-lg hover:bg-solar-600 transition-colors disabled:opacity-50 disabled:hover:bg-solar-500"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            SuryaMitra can make mistakes. Always consult a certified local installer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assistant;