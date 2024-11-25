'use client';  // Add this line at the top of the file

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
    {
      question: "How do I apply for a job through your platform?",
      answer:
        "To apply for a job, click on the 'View Details' button for the position you're interested in. This will take you to the full job description with application instructions. If you're a subscriber to our AI service, it can automatically apply to jobs on your behalf."
    },
    {
      question: "Are all job postings remote positions?",
      answer:
        "Yes, all jobs listed on our platform are remote opportunities. However, some roles may have specific location requirements or time zone preferences. Please check the job details for any such specifications."
    },
    {
      question: "How frequently are new job listings added?",
      answer:
        "We update our job listings daily by aggregating the latest postings from reputable sources like Greenhouse.io. New opportunities are added as soon as they become available, so check back regularly or set up job alerts."
    },
    {
      question: "Can I set up personalized job alerts?",
      answer:
        "Absolutely! You can create custom job alerts based on your preferred roles, industries, and other criteria. Simply sign up for an account and configure your alert settings to receive notifications about new jobs that match your preferences."
    },
    {
      question: "What is Noctura AI and how does it work?",
      answer:
        "Noctura AI is a premium feature that automates your job application process. By subscribing and providing your information, Noctura AI will automatically apply to jobs that match your criteria, saving you time and increasing your chances of landing a position."
    },
    {
      question: "How do I subscribe to Noctura AI?",
      answer:
        "To subscribe, navigate to the 'Noctura AI' section on our website and choose a subscription plan that suits your needs. Once subscribed, you'll need to provide your resume and any additional information to help Noctura AI tailor your applications."
    },
    {
      question: "Is there a cost to use the job search features?",
      answer:
        "Browsing and searching for jobs on our platform is completely free. However, premium features like the Noctura AI service require a subscription."
    },
    {
      question: "I'm an employer. How can I post a job on your platform?",
      answer:
        "Employers can post job openings by clicking on the 'Post a Job' button on our website. You'll be guided through the process of creating a job listing."
    },
    // {
    //   question: "What are the pricing options for job postings?",
    //   answer:
    //     "We offer several pricing plans for job postings, including basic listings and premium options with added visibility features. Please visit our 'Pricing' page for detailed information on each plan."
    // },
    // {
    //   question: "How secure is my personal information?",
    //   answer:
    //     "We take your privacy seriously. All personal information is securely stored and used only for the purposes you've agreed to. Please review our Privacy Policy for more details."
    // },
    {
      question: "How can I contact customer support?",
      answer:
        "If you have any questions or need assistance, please reach out to our support via email us at info@noctura.io."
    }
  ];
  

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-background py-16">
      <div className="mx-auto max-w-[min(100%_-_clamp(60px,_10.1vw,_146px),_1294px)] px-4">
        <h2 className="font-orbitron font-bold text-3xl mb-8 text-primary text-center md:text-left">FAQs</h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border border-black rounded-lg overflow-hidden">
              <button
                className="w-full text-left p-4 bg-black text-background font-semibold flex justify-between items-center"
                onClick={() => toggleQuestion(index)}
              >
                {item.question}
                <span className="transition-transform duration-300 ease-in-out">
                  {expandedIndex === index ? '−' : '+'}
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-4 bg-background text-primary text-sm">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
