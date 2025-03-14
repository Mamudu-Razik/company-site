'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

export default function Home() {
  const textRef = useRef(null);
  const phrases = [
    "Mamudu Razik",
    "a self taught developer",
    "a web developer",
    "a React enthusiast",
    "a problem solver"
  ];

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
    
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    });

    phrases.forEach(phrase => {
      tl.to(textRef.current, {
        duration: 1,
        text: phrase,
        ease: "none",
      }).to(textRef.current, {
        duration: 1.5,
        delay: 1,
        text: "",
        ease: "none",
      });
    });
  }, []);
  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Create falling letters effect
    const text = "Loading...";
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.fontSize = '2rem';
    container.style.color = 'white';
    container.style.zIndex = '10000';
    
    // Create full-screen overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = '#000';
    overlay.style.zIndex = '9999';
    overlay.style.opacity = '0';
    
    
    document.body.appendChild(container);
    document.body.appendChild(overlay);

    // Create and animate falling letters
    text.split('').forEach((letter, i) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      container.appendChild(span);

      gsap.fromTo(span,
        {
          y: -50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: i * 0.1,
          ease: "bounce.out"
        }
      );
    });

    // Animate overlay and handle navigation
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.5,
      delay: text.length * 0.1 + 0.5,
      onComplete: () => {
        window.location.href = '/';
      }
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
       <h1>
        Hi, I'm <span ref={textRef} className="text-blue-400"></span>
       </h1>
    <p className="mt-4 text-lg text-gray-300">Web Developer | Next.js | Tailwind | GSAP</p>
    <a 
      href="/" 
      className="mt-6 px-6 py-3 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
      onClick={handleWorkClick}
    >
      View My Work
    </a>
  </main>
  );
}
