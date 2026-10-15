import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { personalInfo } from '../../data/personal';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import TypewriterText from '../ui/TypewriterText';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Open mailto as fallback
    const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink, '_self');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <SectionTitle
          title="Let's Collaborate"
          subtitle={
            <TypewriterText
              text="Interested in working together? Let's contact me!"
              speed={30}
            />
          }
        />

        <div className="grid md:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Let&apos;s Connect!
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Feel free to reach out directly via email or connect with me on social platforms below.
              </p>
            </div>

            {/* Contact links */}
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 glass-light p-3.5 hover:bg-white/[0.06] 
                           transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-accent-indigo/10 flex items-center 
                               justify-center text-accent-indigo group-hover:bg-accent-indigo/20 
                               transition-colors">
                  <HiOutlineMail className="text-lg" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Email</p>
                  <p className="text-sm text-slate-300">{personalInfo.email}</p>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass-light p-3.5 hover:bg-white/[0.06] 
                           transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center 
                               justify-center text-slate-400 group-hover:bg-white/[0.1] 
                               transition-colors">
                  <FaGithub className="text-lg" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">GitHub</p>
                  <p className="text-sm text-slate-300">nichocode-dotcom</p>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass-light p-3.5 hover:bg-white/[0.06] 
                           transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center 
                               justify-center text-blue-400 group-hover:bg-blue-500/20 
                               transition-colors">
                  <FaLinkedinIn className="text-lg" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">LinkedIn</p>
                  <p className="text-sm text-slate-300">nichoariesetiawan</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass p-6 space-y-4">
              <div>
                <label htmlFor="name" className="text-xs text-slate-400 font-heading font-medium mb-1.5 block">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 
                             text-sm text-white placeholder-slate-600 outline-none 
                             focus:border-accent-indigo/50 focus:bg-white/[0.06] transition-all"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs text-slate-400 font-heading font-medium mb-1.5 block">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 
                             text-sm text-white placeholder-slate-600 outline-none 
                             focus:border-accent-indigo/50 focus:bg-white/[0.06] transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-xs text-slate-400 font-heading font-medium mb-1.5 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 
                             text-sm text-white placeholder-slate-600 outline-none resize-none
                             focus:border-accent-indigo/50 focus:bg-white/[0.06] transition-all"
                  placeholder="Write your message here..."
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitted ? (
                  <>✓ Message Sent!</>
                ) : (
                  <>Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
