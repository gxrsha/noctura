import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PostJobPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="text-accent hover:underline mb-8 inline-block">
          Back to Home
        </Link>
        
        <div className="bg-primary text-background p-8 rounded-lg shadow-lg">
          <div className="flex items-center mb-6">
            <Image
              src="/assets/images/logowhite.png"
              alt="Noctura Logo"
              width={60}
              height={60}
              className="rounded-full mr-4"
            />
            <h1 className="text-3xl font-bold">Post a Job on Noctura</h1>
          </div>

          <div className="space-y-6">
            <p className="text-lg">
              Ready to find your next remote team member? We're currently accepting job postings via email.
            </p>

            <div className="bg-black text-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">How to Post a Job</h2>
              <p className="mb-4">
                Send your job posting details to:{' '}
                <a 
                  href="mailto:info@noctura.io" 
                  className="text-accent hover:underline font-semibold"
                >
                  info@noctura.io
                </a>
              </p>
              
              <h3 className="font-semibold mb-2">Please include:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Company name and website</li>
                <li>Job title</li>
                <li>Detailed job description</li>
                <li>Required skills and qualifications</li>
                <li>Salary range (if available)</li>
                <li>Location requirements (if any)</li>
                <li>Benefits and perks</li>
              </ul>
            </div>

            <p>
              Our team will review your submission and get back to you within 24-48 hours with next steps.
            </p>

            <div className="mt-8">
              <a 
                href="mailto:info@noctura.io" 
                className="bg-accent text-background px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors inline-block"
              >
                Post Job
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 