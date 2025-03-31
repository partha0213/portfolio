import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", percentage: 95 },
      { name: "Java", percentage: 85 },
      { name: "C++", percentage: 80 },
      { name: "JavaScript", percentage: 90 }
    ]
  },
  {
    title: "AI & ML Expertise",
    skills: [
      { name: "TensorFlow", percentage: 90 },
      { name: "Deep Learning", percentage: 85 },
      { name: "NLP", percentage: 80 },
      { name: "Predictive Modeling", percentage: 92 }
    ]
  },
  {
    title: "Frameworks & Technologies",
    skills: [
      { name: "React", percentage: 88 },
      { name: "Node.js", percentage: 85 },
      { name: "MongoDB", percentage: 82 },
      { name: "Express", percentage: 80 }
    ]
  },
  {
    title: "Blockchain & Payments",
    skills: [
      { name: "MetaMask", percentage: 78 },
      { name: "UPI Integration", percentage: 85 },
      { name: "Razorpay", percentage: 75 },
      { name: "Stripe", percentage: 70 }
    ]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency in various technologies.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{category.title}</h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.1 + categoryIndex * 0.05 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{skill.percentage}%</span>
                    </div>
                    <Progress value={skill.percentage} className="h-2" indicatorClassName="bg-gradient-to-r from-primary to-purple-500" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
