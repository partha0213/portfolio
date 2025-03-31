import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  organization: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Microsoft Azure (AZ-900) Certified",
    organization: "Microsoft",
    description: "Earned certification for fundamental cloud concepts and Azure services, demonstrating knowledge of core Azure services and management tools."
  },
  {
    id: 2,
    title: "Oracle Generative AI Certification",
    organization: "Oracle",
    description: "Completed a certification on Generative AI technologies, confirming expertise in developing and implementing cutting-edge AI solutions."
  },
  {
    id: 3,
    title: "Technical Quiz - 2nd Place",
    organization: "KGiSL Institute of Technology, Coimbatore",
    description: "Achieved 2nd place in a Technical quiz, demonstrating strong technical knowledge and problem-solving abilities."
  },
  {
    id: 4,
    title: "Hackathon Participation",
    organization: "Oasys Institute of Technology, Trichy",
    description: "Actively participated in a hackathon, developing innovative solutions using modern technologies."
  },
  {
    id: 5,
    title: "1st Place - International Yoga",
    organization: "SGS International Yoga Foundation, Bengaluru",
    description: "Achieved 1st place in International Yoga competition, demonstrating discipline, focus, and excellence."
  },
  {
    id: 6,
    title: "3rd Place - Yogasana Competition",
    organization: "Puducherry & Inter-zone (Paavai Engineering College)",
    description: "Placed 3rd in multiple Yogasana competitions, showcasing dedication and skill at various levels."
  }
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Achievements & Certifications</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Recognitions and certifications that highlight my expertise and dedication.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-all hover:-translate-y-2 hover:shadow-xl duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full mr-4">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{achievement.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{achievement.organization}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 ml-14">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
