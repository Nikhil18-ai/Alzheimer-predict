import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BrainIcon from "@/components/BrainIcon";

const messages = [
  "Analyzing patient data...",
  "Running ML model...",
  "Processing cognitive patterns...",
  "Generating prediction...",
];

export default function LoadingPage() {
  const navigate = useNavigate();
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  // Cycle messages every 1.8s
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((i) => (i + 1) % messages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Increment progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const increment = Math.random() * 18 + 5;
        return Math.min(p + increment, 99);
      });
    }, 350);
    return () => clearInterval(interval);
  }, []);

  // Navigate after 4s
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => navigate("/predict"), 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8 px-4">
      {/* Rotating brain */}
      <BrainIcon size={200} spinning />

      {/* Cycling message */}
      <div className="h-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="font-heading text-lg text-foreground font-medium"
          >
            {messages[msgIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)))",
            }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
        </div>
        <p className="text-center font-mono text-sm text-muted-foreground">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
