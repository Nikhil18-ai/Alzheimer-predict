import { useNavigate, useLocation } from "react-router-dom";
import { Brain, Sun, Moon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isPredict = location.pathname === "/predict";

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-card/80 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Brain className="w-6 h-6 text-primary" />
          <span className="font-heading font-bold text-xl text-gradient-primary">
            AlzPredict
          </span>
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </button>
          {!isPredict && (
            <>
              <a
                href="/#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="/#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
            </>
          )}
          <button
            onClick={() => navigate("/predict")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Predict
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme switcher */}
          <div className="flex items-center gap-1 bg-muted rounded-full p-1">
            {(
              [
                { key: "light", Icon: Sun, label: "Light" },
                { key: "dark", Icon: Moon, label: "Dark" },
                { key: "custom", Icon: Sparkles, label: "Aurora" },
              ] as const
            ).map(({ key, Icon, label }) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                title={label}
                className={cn(
                  "p-1.5 rounded-full transition-all duration-200",
                  theme === key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <Button
            size="sm"
            onClick={() => navigate("/loading")}
            className="hidden sm:inline-flex"
          >
            Start Prediction
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
