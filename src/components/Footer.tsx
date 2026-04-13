import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="font-heading font-bold text-lg text-gradient-primary">AlzPredict</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
          AlzPredict is an AI-assisted screening tool for educational purposes only. It is not a
          substitute for professional medical advice, diagnosis, or treatment. Always consult a
          qualified healthcare provider for medical decisions.
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} AlzPredict. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
