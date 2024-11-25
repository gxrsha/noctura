import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {

  return (
    <footer className="bg-primary text-background py-12 px-4 min-h-[300px]">
      <div className="max-w-[min(100%_-_clamp(30px,_5vw,_80px),_1294px)] mx-auto">
        <div className="flex flex-wrap justify-between -mx-8">
          <div className="w-full md:w-1/3 px-8 mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <Image 
                src="/assets/images/logowhite.png" 
                alt="Noctura Logo" 
                width={40} 
                height={40} 
                className="mr-2"
              />
              <h2 className="text-3xl font-bold">Noctura</h2>
            </div>
            <p className="text-xs mb-4">
              The Noctura® word mark is a registered trademark owned by Noctura LLC
            </p>
            <p className="text-xs">© Noctura 2024 All rights reserved</p>
          </div>
          {/* <div className="w-full md:w-1/4 px-8 mb-8 md:mb-0">
            <h3 className="font-bold text-xl mb-4">Company</h3>
            <ul className="text-sm space-y-2">
              <li><Link href="#" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Terms of use</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Privacy policy</Link></li>
            </ul>
          </div> */}
          <div className="w-full md:w-1/3 px-8 mb-8 md:mb-0">
            <h3 className="font-bold text-xl mb-4">Contact us</h3>
            <p className="text-lg font-bold mb-4">info@noctura.io</p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter" className="hover:text-accent transition-colors"><i className="fab fa-twitter"></i></Link>
              <Link href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><i className="fab fa-facebook-f"></i></Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-accent transition-colors"><i className="fab fa-linkedin-in"></i></Link>
              <Link href="#" aria-label="Telegram" className="hover:text-accent transition-colors"><i className="fab fa-telegram-plane"></i></Link>
              <Link href="#" aria-label="Discord" className="hover:text-accent transition-colors"><i className="fab fa-discord"></i></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
