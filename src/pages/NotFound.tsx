import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import NeuralBackground from "@/components/NeuralBackground";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen">
      <NeuralBackground />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Brain className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="font-heading font-bold text-6xl text-gradient-primary mb-2">404</h1>
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-3">Page not found</h2>
          <p className="text-muted-foreground mb-8 max-w-sm">
            Looks like this neural pathway doesn't exist. Let's get you back on track.
          </p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </motion.div>
      </div>
    </div>
  );
}
