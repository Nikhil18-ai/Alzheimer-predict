import { motion } from "framer-motion";
import { Users, ShieldCheck, BrainCircuit } from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "6M+ affected in the US",
    desc: "Alzheimer's is the most common form of dementia, affecting millions of Americans and their families.",
  },
  {
    icon: ShieldCheck,
    label: "Early detection saves lives",
    desc: "Identifying risk factors early enables timely intervention and significantly improved quality of life.",
  },
  {
    icon: BrainCircuit,
    label: "AI-assisted screening",
    desc: "Our logistic regression model achieves 83% accuracy, trained on thousands of real-world patient records.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Understanding{" "}
            <span className="text-gradient-primary">Alzheimer's Disease</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Alzheimer's disease is a progressive neurological disorder that causes brain cells to
            waste away and die. It is the most common cause of dementia, leading to a continuous
            decline in thinking, behavioral, and social skills.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            While there is currently no cure, early diagnosis and intervention can help manage
            symptoms, slow progression, and improve quality of life for patients and caregivers alike.
            AlzPredict leverages AI and clinical data to assist in identifying individuals at risk.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8">
          {stats.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground">{label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
