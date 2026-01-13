import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 bg-brand-cream"
    >
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">Get in Touch</h1>
          <p className="text-brand-dark/70">Questions about our ingredients? Order status? <br/>We're here to help.</p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="bg-white p-12 rounded-2xl shadow-xl text-center"
             >
               <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                 <Check size={32} />
               </div>
               <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">Message Sent</h3>
               <p className="text-gray-600 mb-8">Thank you for reaching out. We will get back to you within 24 hours.</p>
               <button 
                 onClick={() => setStatus('idle')}
                 className="text-brand-dark font-medium underline hover:text-brand-green"
               >
                 Send another message
               </button>
             </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2 uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full p-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-brand-green transition-shadow shadow-sm" 
                  placeholder="Your name" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-brand-green transition-shadow shadow-sm" 
                  placeholder="your@email.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2 uppercase tracking-wider">Message</label>
                <textarea 
                  rows={5} 
                  name="message"
                  required
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full p-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-brand-green transition-shadow shadow-sm resize-none" 
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full py-4 bg-brand-dark text-white rounded-xl font-bold hover:bg-brand-green transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'submitting' ? 'Sending...' : <><Send size={18} /> Send Message</>}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Contact;