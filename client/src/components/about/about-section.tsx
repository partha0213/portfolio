import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Award, Check } from "lucide-react";

interface TimelineItem {
  period: string;
  title: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    period: "2022 - Present",
    title: "B.Tech in AI & ML",
    description: "Studying Artificial Intelligence and Machine Learning at M. Kumarasamy College of Engineering with a GPA of 6.7/10.00."
  },
  {
    period: "2020 - 2023",
    title: "Diploma in Marine Engineering",
    description: "Completed diploma program at Chandy Polytechnic College with 81%, gaining strong foundation in engineering principles."
  },
  {
    period: "2023 - Present",
    title: "Full-Stack Development",
    description: "Developing web applications using the MERN stack, with a focus on building scalable solutions and implementing modern UI/UX principles."
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Journey</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I'm a passionate AI & ML Developer and Full-Stack Engineer with a strong foundation in developing innovative solutions to complex problems. My academic background and professional experience have equipped me with a diverse skill set in cutting-edge technologies.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">B.Tech in AI & ML</h4>
                  <p className="text-gray-600 dark:text-gray-400">M. Kumarasamy College of Engineering</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Diploma in Marine Engineering</h4>
                  <p className="text-gray-600 dark:text-gray-400">Chandy Polytechnic College</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Key Strengths</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Problem-solving</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Team Management</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Decision-making</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">C++</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Java</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Python</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white lg:hidden">Experience Timeline</h3>
            
            <div className="relative pl-10 md:pl-12 before:content-[''] before:absolute before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700 before:top-0 before:bottom-0 before:left-6">
              {timelineItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="mb-12 last:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="absolute w-5 h-5 rounded-full bg-primary left-4 z-10 -translate-x-1/2"></div>
                  <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-6">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 mb-3">
                        {item.period}
                      </span>
                      <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
