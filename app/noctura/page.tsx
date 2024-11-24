'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const NocturaAIPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [waitlistMessage, setWaitlistMessage] = useState('');

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError('');
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('tags', 'AI'); // Default tag for Noctura AI waitlist

      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      
      const data = await response.json();
      setWaitlistMessage(data.message || 'An error occurred');
      
      if (response.ok) {
        setEmail('');
        setEmailError('');
      }
    } catch (error) {
      setWaitlistMessage('Error joining waitlist. Please try again.');
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl text-white text-center mb-8">Noctura AI: Your Job Application Assistant</h1>
        
        <div className="flex justify-center">
          <Image
            src="https://i.imgur.com/R2nkPSm.png"
            alt="Noctura Logo"
            width={150}
            height={150}
            priority
          />
        </div>

        <div className="rounded-lg shadow-lg p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl text-white font-semibold mb-4">What is Noctura AI?</h2>
          <p className="text-white">
            Imagine having a personal job-seeking assistant that never sleeps, tirelessly scanning the market for the right opportunities. That’s Noctura AI. Powered by advanced AI, it’s designed to simplify your job search, applying to relevant roles on your behalf with unmatched speed and precision. With Noctura AI by your side, you can maximize your job search efforts, unlocking opportunities effortlessly while saving countless hours.
          </p>
        </div>

        <div className="rounded-lg shadow-lg p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl text-white font-semibold mb-4">How it works</h2>
          <p className="text-white">
            Noctura AI combines the latest in natural language processing and machine learning to revolutionize how you apply for jobs. Acting as your personal job search assistant, it scours openings, matches them to your skills, and applies on your behalf—all while learning what works best for you over time. It’s the ultimate tool for job seekers looking to streamline and supercharge their application process.
          </p>
        </div>

        <div className="rounded-lg shadow-lg p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl text-white font-semibold mb-4">Numbers game</h2>
          <p className="text-white">
            Success in job hunting often boils down to exposure—the more applications you send, the greater your chances. Noctura AI leverages the power of automation to send hundreds of tailored applications per hour, targeting roles that match your experience and skills. Focus on the best-fit opportunities, while Noctura AI scales your search like never before.
          </p>
        </div>

        <div className="rounded-lg shadow-lg p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl text-white font-semibold mb-4">Join the waitlist</h2>
          <p className="text-white mb-6">
            Sign up for the waitlist to be the first to know when Noctura AI is ready for use. 
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value) validateEmail(e.target.value);
                }}
                placeholder="Enter your email"
                className={`px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-accent ${
                  emailError ? 'border-red-500' : ''
                }`}
                required
              />
              {emailError && (
                <span className="text-red-400 text-sm">{emailError}</span>
              )}
              <button 
                type="submit"
                className="px-6 py-2 bg-accent text-white rounded-lg transition-colors hover:bg-opacity-90 cursor-pointer"
              >
                Join Waitlist
              </button>
            </div>
          </form>
          
          {waitlistMessage && (
            <p className="mt-4 text-center text-sm text-white">
              {waitlistMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NocturaAIPage;
