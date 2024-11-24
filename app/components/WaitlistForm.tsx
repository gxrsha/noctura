'use client';

import { useState } from 'react';

const AVAILABLE_TAGS = [
    "AI", "API", "Android", "Backend", "Blockchain", "Cloud", "Crypto", 
    "Cybersecurity", "Data Science", "Database", "Design", "DevOps", 
    "Engineering", "Entry Level", "Frontend", "Fullstack", "Machine Learning", 
    "Mobile", "New Grad", "Product Management", "SRE", "Software Development", 
    "Web", "iOS"
];

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [waitlistMessage, setWaitlistMessage] = useState('');
  const [emailError, setEmailError] = useState('');

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail) {
      validateEmail(newEmail);
    } else {
      setEmailError('');
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    if (selectedTags.length === 0) {
      setWaitlistMessage('Please select at least one tag');
      return;
    }
    
    try {
      const params = new URLSearchParams();
      params.append('email', email);
      selectedTags.forEach(tag => {
        params.append('tags', tag);
      });

      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      
      const data = await response.json();
      
      const message = typeof data.message === 'string' 
        ? data.message 
        : 'An error occurred';
      
      setWaitlistMessage(message);
      
      if (response.ok) {
        setEmail('');
        setSelectedTags([]);
        setEmailError('');
      }
    } catch (error) {
      setWaitlistMessage('Error joining waitlist. Please try again.');
    }
  };

  return (
    <div className="w-full my-8 p-6 bg-primary text-background rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Get Daily Job Alerts</h2>
      <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => validateEmail(email)}
            placeholder="Enter your email"
            required
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-primary ${
              emailError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {emailError && (
            <span className="text-red-400 text-sm">{emailError}</span>
          )}
        </div>
        
        <div className="mt-4">
          <p className="text-sm mb-2">Select your interests:</p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-accent text-background'
                    : 'bg-background text-primary hover:bg-accent/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center sm:justify-end mt-4">
          <button 
            type="submit" 
            className={`px-6 py-2 bg-accent text-background rounded-lg transition-colors w-full sm:w-48
              ${selectedTags.length === 0 || !!emailError 
                ? 'cursor-not-allowed' 
                : 'hover:bg-opacity-90 cursor-pointer'
              }`}
            disabled={selectedTags.length === 0 || !!emailError}
          >
            Join Waitlist
          </button>
        </div>
      </form>
      
      {waitlistMessage && (
        <p className="mt-4 text-center text-sm text-background">
          {waitlistMessage}
        </p>
      )}
    </div>
  );
} 