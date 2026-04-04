"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// @ts-ignore - Next.js turbopack/ts bundler resolution bug with react-hook-form
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MagneticButton from '../ui/MagneticButton';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section-space relative bg-bg">
      <div className="section-shell">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-5"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-5 text-white/80">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="section-heading text-3xl sm:text-4xl mb-4">Let&apos;s work together.</h2>
              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
                Share your idea, timeline, and goals. I&apos;ll get back with a practical plan and clear next steps.
              </p>
              <div className="space-y-3 text-sm text-white/70">
                <p>Typical reply time: within 24 hours</p>
                <p>Best for: AI products, full-stack apps, and consulting</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.08 }}
              className="lg:col-span-7"
            >
              <div className="rounded-2xl border border-white/10 bg-bg-2/70">
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-8 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-white/50 mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      {...register('name')}
                      className={`w-full bg-bg border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-blue transition-colors`}
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-white/50 mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      {...register('email')}
                      className={`w-full bg-bg border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-blue transition-colors`}
                      placeholder="jane@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-white/50 mb-2 uppercase tracking-wider">
                    Subject <span className="text-white/30">(Optional)</span>
                  </label>
                  <input
                    {...register('subject')}
                    className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-blue transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="mb-6 sm:mb-10">
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-white/50 mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className={`w-full bg-bg border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-blue transition-colors resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-2">{errors.message.message}</p>}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
                  <MagneticButton className="w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full sm:w-auto bg-white text-bg px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      {status === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </MagneticButton>

                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-center gap-2 text-emerald-400 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Message sent successfully!</span>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-center gap-2 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Failed to send. Please try again.</span>
                    </motion.div>
                  )}
                </div>
              </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
