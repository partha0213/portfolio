import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { downloadResume } from "@/lib/utils";
import { Download, Mail } from "lucide-react";

const animatedTexts = [
  "AI & ML Developer",
  "Full-Stack Engineer",
  "Blockchain Enthusiast",
  "Problem Solver",
  "Innovator"
];

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % animatedTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-200 dark:bg-primary-900 blur-3xl"></div>
          <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span>Hi, I'm </span>
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Partha Sarathy
              </span>
            </h1>
            
            <div className="h-12 md:h-14 lg:h-16 overflow-hidden mb-6">
              <motion.div
                className="flex flex-col"
                animate={{ y: -currentTextIndex * 100 + "%" }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              >
                {animatedTexts.map((text, index) => (
                  <div 
                    key={index} 
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary h-12 md:h-14 lg:h-16 flex items-center justify-center lg:justify-start"
                  >
                    {text}
                  </div>
                ))}
              </motion.div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Developing AI-driven solutions, predictive analytics, and blockchain-secured platforms to solve real-world problems.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={downloadResume}
              >
                <Download className="h-5 w-5" />
                Download Resume
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
                onClick={() => {
                  const contactSection = document.querySelector("#contact");
                  if (contactSection) {
                    window.scrollTo({
                      top: contactSection.getBoundingClientRect().top + window.scrollY - 80,
                      behavior: "smooth"
                    });
                  }
                }}
              >
                <Mail className="h-5 w-5" />
                Contact Me
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Partha Sarathy" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
