import { motion } from "framer-motion";
import { BrainCircuit, Zap, Lock, MousePointerClick } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Accurate Prediction",
    description:
      "Logistic regression model trained on thousands of patient records with 83%+ accuracy and gradient boosting at 95.8%.",
  },
  {
    icon: Zap,
    title: "Fast Analysis",
    description:
      "Client-side ML inference means results are delivered in milliseconds — no server round-trips for prediction.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "All predictions run locally in your browser. Your health data never leaves your device for the ML inference step.",
  },
  {
    icon: MousePointerClick,
    title: "Easy to Use",
    description:
      "A guided 32-field assessment form with tooltips and clear sections makes entering clinical data straightforward.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Why Choose{" "}
            <span className="text-gradient-primary">AlzPredict?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Combining clinical expertise with modern machine learning for accessible, accurate early screening.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="card-elevated p-6 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
