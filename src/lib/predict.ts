import modelParams from "@/data/model_params.json";

export interface PredictionInput {
  Age: number;
  Gender: number;
  Ethnicity: number;
  EducationLevel: number;
  BMI: number;
  Smoking: number;
  AlcoholConsumption: number;
  PhysicalActivity: number;
  DietQuality: number;
  SleepQuality: number;
  FamilyHistoryAlzheimers: number;
  CardiovascularDisease: number;
  Diabetes: number;
  Depression: number;
  HeadInjury: number;
  Hypertension: number;
  SystolicBP: number;
  DiastolicBP: number;
  CholesterolTotal: number;
  CholesterolLDL: number;
  CholesterolHDL: number;
  CholesterolTriglycerides: number;
  MMSE: number;
  FunctionalAssessment: number;
  MemoryComplaints: number;
  BehavioralProblems: number;
  ADL: number;
  Confusion: number;
  Disorientation: number;
  PersonalityChanges: number;
  DifficultyCompletingTasks: number;
  Forgetfulness: number;
}

export interface PredictionResult {
  positive: boolean;
  probability: number;
  confidence: number;
}

export function predict(input: PredictionInput): PredictionResult {
  const { coefficients, intercept, scaler_mean, scaler_scale, features } =
    modelParams;

  const values = features.map(
    (f) => input[f as keyof PredictionInput] ?? 0
  );

  if (values.length !== 32) {
    throw new Error(`Expected 32 features, got ${values.length}`);
  }

  // Scale features
  const scaled = values.map(
    (v, i) => (v - scaler_mean[i]) / scaler_scale[i]
  );

  // Logistic regression: z = intercept + sum(coef * scaled)
  const z =
    intercept +
    scaled.reduce((sum, val, i) => sum + coefficients[i] * val, 0);

  // Sigmoid
  const probability = 1 / (1 + Math.exp(-z));
  const positive = probability >= 0.5;
  const confidence = positive ? probability : 1 - probability;

  return { positive, probability, confidence };
}
