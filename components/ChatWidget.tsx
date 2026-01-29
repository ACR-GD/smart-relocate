"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([
    { role: 'bot', text: "Hello. I am Moltbot. I monitor Malaysian immigration law 24/7. Ask me anything." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: "System Error: Neural link unstable." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] md:w-[400px] h-[500px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-mono font-bold">Moltbot AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-slate-300">
                <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-sm whitespace-pre-wrap ${
                        m.role === 'user' 
                        ? 'bg-brand-600 text-white rounded-br-none' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                    }`}>
                        {m.text}
                    </div>
                </div>
            ))}
            {loading && (
                <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 rounded-2xl p-3 rounded-bl-none shadow-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
                className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-600 text-slate-900"
                placeholder="Ask about MM2H, Labuan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-brand-600 hover:bg-brand-700 text-white p-2 rounded-full transition-colors"
            >
                <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 font-bold"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span className="hidden md:inline">Ask Moltbot</span>}
      </button>
    </div>
  );
}
