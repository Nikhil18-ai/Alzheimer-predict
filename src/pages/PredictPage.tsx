import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Brain,
  Activity,
  FlaskConical,
  Cpu,
  Pill,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import NeuralBackground from "@/components/NeuralBackground";
import { predict, type PredictionInput, type PredictionResult } from "@/lib/predict";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type FormData = Record<string, string>;

const defaultForm: FormData = {
  Age: "72",
  Gender: "0",
  Ethnicity: "0",
  EducationLevel: "1",
  BMI: "27",
  Smoking: "0",
  AlcoholConsumption: "5",
  PhysicalActivity: "4",
  DietQuality: "5",
  SleepQuality: "7",
  FamilyHistoryAlzheimers: "0",
  CardiovascularDisease: "0",
  Diabetes: "0",
  Depression: "0",
  HeadInjury: "0",
  Hypertension: "0",
  SystolicBP: "130",
  DiastolicBP: "85",
  CholesterolTotal: "220",
  CholesterolLDL: "120",
  CholesterolHDL: "55",
  CholesterolTriglycerides: "150",
  MMSE: "26",
  FunctionalAssessment: "7",
  MemoryComplaints: "0",
  BehavioralProblems: "0",
  ADL: "8",
  Confusion: "0",
  Disorientation: "0",
  PersonalityChanges: "0",
  DifficultyCompletingTasks: "0",
  Forgetfulness: "0",
};

// ─────────────────────────────────────────────
// Field helper components
// ─────────────────────────────────────────────
function FieldLabel({
  label,
  tooltip,
  htmlFor,
}: {
  label: string;
  tooltip?: string;
  htmlFor: string;
}) {
  return (
    <div className="flex items-center gap-1 mb-1">
      <Label htmlFor={htmlFor} className="text-sm">
        {label}
      </Label>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

function NumberField({
  id,
  label,
  unit,
  tooltip,
  min,
  max,
  value,
  onChange,
}: {
  id: string;
  label: string;
  unit?: string;
  tooltip?: string;
  min?: number;
  max?: number;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel label={label} tooltip={tooltip} htmlFor={id} />
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        {unit && <span className="text-xs text-muted-foreground shrink-0">{unit}</span>}
      </div>
    </div>
  );
}

function YesNoField({
  id,
  label,
  tooltip,
  value,
  onChange,
}: {
  id: string;
  label: string;
  tooltip?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel label={label} tooltip={tooltip} htmlFor={id} />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">No</SelectItem>
          <SelectItem value="1">Yes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

// ─────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────
function Section({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="card-elevated p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
        <Icon className="w-4 h-4 text-primary" />
        <h3 className="font-heading font-semibold text-foreground">{title}</h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function PredictPage() {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: string) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const toInput = (): PredictionInput =>
    Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, parseFloat(v) || 0])
    ) as unknown as PredictionInput;

  const handleSubmit = () => {
    const input = toInput();
    const res = predict(input);
    setResult(res);
    setSubmitted(true);

    // Scroll to result
    setTimeout(() => {
      document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="relative min-h-screen">
      <NeuralBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Alzheimer's{" "}
              <span className="text-gradient-primary">Risk Assessment</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Complete all 32 fields across the sections below. The ML model runs entirely
              in your browser and your data is never stored.
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* ── 1. Demographics ─────────────────────── */}
            <Section icon={Brain} title="Demographics" delay={0.05}>
              <NumberField
                id="Age" label="Age" unit="years" min={18} max={110}
                value={form.Age} onChange={set("Age")}
              />
              <div>
                <FieldLabel label="Gender" htmlFor="Gender" />
                <Select value={form.Gender} onValueChange={set("Gender")}>
                  <SelectTrigger id="Gender"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Female</SelectItem>
                    <SelectItem value="1">Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <FieldLabel label="Ethnicity" htmlFor="Ethnicity" />
                <Select value={form.Ethnicity} onValueChange={set("Ethnicity")}>
                  <SelectTrigger id="Ethnicity"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Caucasian</SelectItem>
                    <SelectItem value="1">African American</SelectItem>
                    <SelectItem value="2">Asian</SelectItem>
                    <SelectItem value="3">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <FieldLabel label="Education Level" htmlFor="EducationLevel" />
                <Select value={form.EducationLevel} onValueChange={set("EducationLevel")}>
                  <SelectTrigger id="EducationLevel"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">None</SelectItem>
                    <SelectItem value="1">High School</SelectItem>
                    <SelectItem value="2">Bachelor's</SelectItem>
                    <SelectItem value="3">Higher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <NumberField
                id="BMI" label="BMI" unit="kg/m²" min={10} max={60}
                value={form.BMI} onChange={set("BMI")}
              />
            </Section>

            {/* ── 2. Lifestyle ─────────────────────────── */}
            <Section icon={Activity} title="Lifestyle" delay={0.1}>
              <YesNoField id="Smoking" label="Smoking" value={form.Smoking} onChange={set("Smoking")} />
              <NumberField
                id="AlcoholConsumption" label="Alcohol Consumption" unit="drinks/wk" min={0} max={50}
                value={form.AlcoholConsumption} onChange={set("AlcoholConsumption")}
              />
              <NumberField
                id="PhysicalActivity" label="Physical Activity" unit="hrs/wk" min={0} max={40}
                value={form.PhysicalActivity} onChange={set("PhysicalActivity")}
              />
              <NumberField
                id="DietQuality" label="Diet Quality" unit="0–10" min={0} max={10}
                tooltip="0 = very poor, 10 = excellent diet"
                value={form.DietQuality} onChange={set("DietQuality")}
              />
              <NumberField
                id="SleepQuality" label="Sleep Quality" unit="4–10" min={4} max={10}
                tooltip="4 = very poor sleep, 10 = excellent sleep"
                value={form.SleepQuality} onChange={set("SleepQuality")}
              />
            </Section>

            {/* ── 3. Medical History ───────────────────── */}
            <Section icon={Pill} title="Medical History" delay={0.15}>
              <YesNoField id="FamilyHistoryAlzheimers" label="Family History of Alzheimer's" value={form.FamilyHistoryAlzheimers} onChange={set("FamilyHistoryAlzheimers")} />
              <YesNoField id="CardiovascularDisease" label="Cardiovascular Disease" value={form.CardiovascularDisease} onChange={set("CardiovascularDisease")} />
              <YesNoField id="Diabetes" label="Diabetes" value={form.Diabetes} onChange={set("Diabetes")} />
              <YesNoField id="Depression" label="Depression" value={form.Depression} onChange={set("Depression")} />
              <YesNoField id="HeadInjury" label="Head Injury" value={form.HeadInjury} onChange={set("HeadInjury")} />
              <YesNoField id="Hypertension" label="Hypertension" value={form.Hypertension} onChange={set("Hypertension")} />
            </Section>

            {/* ── 4. Clinical Measurements ─────────────── */}
            <Section icon={FlaskConical} title="Clinical Measurements" delay={0.2}>
              <NumberField id="SystolicBP" label="Systolic BP" unit="mmHg" min={70} max={220} value={form.SystolicBP} onChange={set("SystolicBP")} />
              <NumberField id="DiastolicBP" label="Diastolic BP" unit="mmHg" min={40} max={140} value={form.DiastolicBP} onChange={set("DiastolicBP")} />
              <NumberField id="CholesterolTotal" label="Total Cholesterol" unit="mg/dL" min={50} max={500} value={form.CholesterolTotal} onChange={set("CholesterolTotal")} />
              <NumberField id="CholesterolLDL" label="LDL Cholesterol" unit="mg/dL" min={10} max={300} value={form.CholesterolLDL} onChange={set("CholesterolLDL")} />
              <NumberField id="CholesterolHDL" label="HDL Cholesterol" unit="mg/dL" min={10} max={150} value={form.CholesterolHDL} onChange={set("CholesterolHDL")} />
              <NumberField id="CholesterolTriglycerides" label="Triglycerides" unit="mg/dL" min={20} max={800} value={form.CholesterolTriglycerides} onChange={set("CholesterolTriglycerides")} />
            </Section>

            {/* ── 5. Cognitive & Functional ────────────── */}
            <Section icon={Cpu} title="Cognitive & Functional Scores" delay={0.25}>
              <NumberField
                id="MMSE" label="MMSE Score" unit="0–30" min={0} max={30}
                tooltip="Mini-Mental State Examination. Higher = better cognitive function. Normal ≥ 24."
                value={form.MMSE} onChange={set("MMSE")}
              />
              <NumberField
                id="FunctionalAssessment" label="Functional Assessment" unit="0–10" min={0} max={10}
                tooltip="Measures ability to perform daily activities. Higher = better function."
                value={form.FunctionalAssessment} onChange={set("FunctionalAssessment")}
              />
              <NumberField
                id="ADL" label="ADL Score" unit="0–10" min={0} max={10}
                tooltip="Activities of Daily Living score. Higher = more independent."
                value={form.ADL} onChange={set("ADL")}
              />
            </Section>

            {/* ── 6. Symptoms ──────────────────────────── */}
            <Section icon={Brain} title="Symptoms" delay={0.3}>
              <YesNoField id="MemoryComplaints" label="Memory Complaints" value={form.MemoryComplaints} onChange={set("MemoryComplaints")} />
              <YesNoField id="BehavioralProblems" label="Behavioral Problems" value={form.BehavioralProblems} onChange={set("BehavioralProblems")} />
              <YesNoField id="Confusion" label="Confusion" value={form.Confusion} onChange={set("Confusion")} />
              <YesNoField id="Disorientation" label="Disorientation" value={form.Disorientation} onChange={set("Disorientation")} />
              <YesNoField id="PersonalityChanges" label="Personality Changes" value={form.PersonalityChanges} onChange={set("PersonalityChanges")} />
              <YesNoField id="DifficultyCompletingTasks" label="Difficulty Completing Tasks" value={form.DifficultyCompletingTasks} onChange={set("DifficultyCompletingTasks")} />
              <YesNoField id="Forgetfulness" label="Forgetfulness" value={form.Forgetfulness} onChange={set("Forgetfulness")} />
            </Section>

            {/* ── Submit ───────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <Button size="lg" onClick={handleSubmit} className="px-12 gap-2">
                <Brain className="w-4 h-4" />
                Run Prediction
              </Button>
            </motion.div>

            {/* ── Result ───────────────────────────────── */}
            {submitted && result && (
              <div id="result-section" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`card-elevated p-8 text-center ${
                    result.positive
                      ? "border-destructive/40 bg-destructive/5"
                      : "border-success/40 bg-success/5"
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    {result.positive ? (
                      <AlertCircle className="w-12 h-12 text-destructive" />
                    ) : (
                      <CheckCircle2 className="w-12 h-12 text-success" />
                    )}
                  </div>
                  <h2 className="font-heading font-bold text-2xl mb-1">
                    {result.positive
                      ? "🔴 Alzheimer's Detected"
                      : "🟢 No Alzheimer's Detected"}
                  </h2>

                  <div className="flex justify-center gap-8 mt-6 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-heading font-bold text-foreground">
                        {(result.probability * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">Probability</p>
                    </div>
                    <div className="w-px bg-border" />
                    <div className="text-center">
                      <p className="text-2xl font-heading font-bold text-foreground">
                        {(result.confidence * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">Confidence</p>
                    </div>
                  </div>

                  {/* Confidence bar */}
                  <div className="max-w-xs mx-auto">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${result.positive ? "bg-destructive" : "bg-success"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-4">
                    Model accuracy: 83.02% (Logistic Regression) · 95.81% (Gradient Boosting)
                  </p>
                </motion.div>

              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
