import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Stethoscope,
  Brain,
  Apple,
  Users,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Recommendation {
  category: "Lifestyle" | "Medical" | "Cognitive" | "Dietary" | "Social";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface AIRecommendationsData {
  summary: string;
  riskLevel: "low" | "moderate" | "high";
  recommendations: Recommendation[];
  preventiveMeasures: string[];
  disclaimer: string;
}

interface Props {
  data?: AIRecommendationsData;
  isLoading?: boolean;
  error?: string;
}

const categoryIcon: Record<Recommendation["category"], React.ComponentType<{ className?: string }>> = {
  Lifestyle: Heart,
  Medical: Stethoscope,
  Cognitive: Brain,
  Dietary: Apple,
  Social: Users,
};

const priorityVariant: Record<Recommendation["priority"], "destructive" | "warning" | "success"> = {
  high: "destructive",
  medium: "warning",
  low: "success",
};

const riskColors: Record<AIRecommendationsData["riskLevel"], string> = {
  low: "bg-success/10 text-success border-success/20",
  moderate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function AIRecommendations({ data, isLoading, error }: Props) {
  if (isLoading) {
    return (
      <div className="card-elevated p-10 flex flex-col items-center justify-center gap-4 text-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground">Generating AI recommendations…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-elevated p-8 flex items-start gap-4 border-destructive/30 bg-destructive/5">
        <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-destructive mb-1">Could not load AI recommendations</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header card */}
      <div className="card-elevated p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">AI Recommendations</h3>
            <p className="text-sm text-muted-foreground">Personalised health guidance</p>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${riskColors[data.riskLevel]}`}
        >
          {data.riskLevel} risk
        </span>
      </div>

      {/* Summary */}
      <p className="text-muted-foreground leading-relaxed px-1">{data.summary}</p>

      {/* Recommendation cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {data.recommendations.map((rec, i) => {
          const Icon = categoryIcon[rec.category] ?? Heart;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card-elevated p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{rec.category}</span>
                </div>
                <Badge variant={priorityVariant[rec.priority]} className="text-xs capitalize shrink-0">
                  {rec.priority}
                </Badge>
              </div>
              <h4 className="font-heading font-semibold text-sm text-foreground">{rec.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Preventive measures */}
      {data.preventiveMeasures.length > 0 && (
        <div className="card-elevated p-6">
          <h4 className="font-heading font-semibold text-foreground mb-4">Preventive Measures</h4>
          <ul className="space-y-2">
            {data.preventiveMeasures.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground border border-border rounded-lg p-4 leading-relaxed">
        ⚕️ {data.disclaimer}
      </p>
    </motion.div>
  );
}
