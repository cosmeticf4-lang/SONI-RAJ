import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Headset, MessageCircle } from 'lucide-react';
import { OWNER_DETAILS } from '../constants';

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'system' | 'user', text: string, time: string }[]>([
    { role: 'system', text: 'Welcome to Soni Raj Boutique. How can our concierge assist you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { 
      role: 'user' as const, 
      text: inputValue, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate system response
    setTimeout(() => {
      setIsTyping(false);
      const systemMessage = { 
        role: 'system' as const, 
        text: 'Connecting you with a specialist... For immediate assistance with orders or custom styling, you can also connect directly on WhatsApp.', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, systemMessage]);
    }, 1500);
  };

  const openWhatsApp = () => {
    const message = "Hi Soni Raj Support, I need assistance with my inquiry.";
    window.open(`https://wa.me/${OWNER_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, originY: 1, originX: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-6 w-[350px] bg-luxury-bg border border-white/10 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-luxury-surface border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                  <Headset className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-serif italic text-white leading-none mb-1">Luxury Concierge</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Online Now</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="h-[350px] overflow-y-auto p-6 space-y-4 scrollbar-hide bg-black/20"
            >
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'system' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${msg.role === 'system' ? 'items-start' : 'items-end'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-[11px] leading-relaxed ${
                    msg.role === 'system' 
                    ? 'bg-white/5 text-white/70 italic rounded-tl-none border border-white/5' 
                    : 'bg-luxury-gold text-black font-medium rounded-tr-none'
                  }`}>
                    {msg.text}
                    {msg.text.includes('WhatsApp') && msg.role === 'system' && (
                      <button 
                        onClick={openWhatsApp}
                        className="mt-3 flex items-center gap-2 bg-black/20 px-3 py-2 rounded-lg hover:bg-black/40 transition-all text-white border border-white/5"
                      >
                        <MessageCircle className="w-3 h-3" /> Connect on WhatsApp
                      </button>
                    )}
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-white/20 mt-1">{msg.time}</span>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-1.5 p-2 px-4 bg-white/5 rounded-full w-fit">
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-100" />
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-200" />
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-luxury-surface">
              <div className="relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask our concierge..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-white outline-none focus:border-luxury-gold transition-colors pr-12"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-luxury-gold text-black rounded-lg flex items-center justify-center hover:bg-white transition-all transform active:scale-95"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-luxury-gold text-black rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group border border-white/10 shadow-luxury-gold/10"
      >
        <motion.div
          animate={isOpen ? { rotate: 90, opacity: 0 } : { rotate: 0, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
        </motion.div>
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={isOpen ? { rotate: 0, opacity: 1 } : { rotate: -90, opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </motion.div>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
      </motion.button>
    </div>
  );
};

export default SupportChat;
