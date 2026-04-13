# AlzPredict — AI-Powered Alzheimer's Disease Prediction

A production-ready full-stack web application for Alzheimer's Disease risk prediction using client-side Machine Learning and AI-generated health recommendations.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, TypeScript 5 |
| Styling | Tailwind CSS v3, Framer Motion |
| UI Components | shadcn/ui (Radix primitives) |
| Fonts | Inter (body), Poppins (headings) |
| Icons | lucide-react |
| ML Model | Client-side Logistic Regression (JSON params) |
| Backend | Supabase Edge Functions (Deno) |
| AI | OpenAI-compatible API via Edge Function |
| Routing | react-router-dom v6 |
| State | React Query + useState |

---

## 📁 Project Structure

```
alzpredict/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── src/
│   ├── App.tsx                        # Routes + providers
│   ├── main.tsx                       # Entry point
│   ├── index.css                      # Theme CSS variables + utilities
│   ├── components/
│   │   ├── Navbar.tsx                 # Fixed navbar with theme switcher
│   │   ├── HeroSection.tsx            # Hero with animated brain + CTA
│   │   ├── BrainIcon.tsx              # Animated SVG brain (healthy vs affected)
│   │   ├── NeuralBackground.tsx       # Canvas neural network animation
│   │   ├── AboutSection.tsx           # About + stats
│   │   ├── FeaturesSection.tsx        # 4-column feature cards
│   │   ├── CTASection.tsx             # Call-to-action card
│   │   ├── Footer.tsx                 # Footer with disclaimer
│   │   ├── AIRecommendations.tsx      # AI results display component
│   │   └── ui/                        # shadcn/ui primitives
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── tooltip.tsx
│   ├── pages/
│   │   ├── Index.tsx                  # Homepage (/)
│   │   ├── LoadingPage.tsx            # Animated loading (/loading)
│   │   ├── PredictPage.tsx            # 32-field form + results (/predict)
│   │   └── NotFound.tsx               # 404 page
│   ├── hooks/
│   │   └── use-theme.tsx              # ThemeProvider + useTheme hook
│   ├── lib/
│   │   ├── predict.ts                 # Logistic regression inference
│   │   └── utils.ts                   # cn() utility
│   ├── data/
│   │   └── model_params.json          # Trained model weights (32 features)
│   └── integrations/supabase/
│       └── client.ts                  # Supabase client
└── supabase/
    └── functions/
        └── ai-recommendations/
            └── index.ts               # Deno Edge Function → OpenAI
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 🧠 ML Model

The prediction uses a pre-trained **Logistic Regression** model running entirely in the browser:

- **32 input features** — demographics, lifestyle, medical history, clinical measurements, cognitive scores, and symptoms
- **Accuracy:** 83.02% (Logistic Regression), 95.81% (Gradient Boosting reference)
- **No data leaves the browser** — inference is 100% client-side

### How it works

```
raw input → standard scaling → z = intercept + Σ(coeff * scaled) → sigmoid → probability
```

---

## 🤖 AI Recommendations (Supabase Edge Function)

After prediction, the app calls a Supabase Edge Function which forwards the patient data and prediction result to an OpenAI-compatible API.

### Deploying the Edge Function

```bash
# Install Supabase CLI
npm install -g supabase

# Link your project
supabase link --project-ref your-project-ref

# Set secrets
supabase secrets set OPENAI_API_KEY=sk-...

# Deploy
supabase functions deploy ai-recommendations
```

The function returns structured JSON with:
- Risk level (low / moderate / high)
- 5–6 personalised recommendations across Lifestyle, Medical, Cognitive, Dietary, Social categories
- Preventive measures list
- Medical disclaimer

---

## 🎨 Themes

AlzPredict supports 3 themes stored in `localStorage` under the key `alz-theme`:

| Theme | Key | Description |
|---|---|---|
| Light | `light` | Clean medical blue on white |
| Dark | `dark` | Deep navy with glowing accents |
| Purple Aurora | `custom` | Deep purple with aurora gradients |

Switch themes via the pill-shaped switcher in the navbar (Sun / Moon / Sparkles icons).

---

## 📄 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Index | Homepage with hero, about, features, CTA |
| `/loading` | LoadingPage | 4-second animated loading screen |
| `/predict` | PredictPage | 32-field assessment + ML result + AI recs |
| `*` | NotFound | 404 page |

---

## ⚠️ Medical Disclaimer

AlzPredict is an **educational and research tool only**. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for any medical decisions.
