import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PredictionResult {
  positive: boolean;
  probability: number;
  confidence: number;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { patientData, prediction } = (await req.json()) as {
      patientData: Record<string, number>;
      prediction: PredictionResult;
    };

    const systemPrompt = `You are a medical AI assistant specializing in Alzheimer's disease prevention and management. 
Analyze the patient data and prediction result, then provide structured health recommendations in JSON format.
Always respond with a valid JSON object with no markdown, no code blocks, just raw JSON.`;

    const userPrompt = `Patient data: ${JSON.stringify(patientData, null, 2)}

Prediction result:
- Alzheimer's Detected: ${prediction.positive}
- Probability: ${(prediction.probability * 100).toFixed(1)}%
- Confidence: ${(prediction.confidence * 100).toFixed(1)}%

Based on this assessment, provide personalized health recommendations in exactly this JSON structure:
{
  "summary": "Brief 2-3 sentence assessment summary based on the patient's specific risk factors",
  "riskLevel": "low" | "moderate" | "high",
  "recommendations": [
    {
      "category": "Lifestyle" | "Medical" | "Cognitive" | "Dietary" | "Social",
      "title": "Concise action title",
      "description": "2-3 sentence specific, actionable advice tailored to this patient",
      "priority": "high" | "medium" | "low"
    }
  ],
  "preventiveMeasures": ["measure 1", "measure 2", "measure 3", "measure 4", "measure 5"],
  "disclaimer": "Medical disclaimer text"
}

Provide exactly 5-6 recommendation objects covering different categories. Make recommendations specific to the patient's data.`;

    const AI_ENDPOINT =
      Deno.env.get("AI_GATEWAY_URL") ??
      "https://api.openai.com/v1/chat/completions";
    const AI_KEY =
      Deno.env.get("OPENAI_API_KEY") ??
      Deno.env.get("AI_GATEWAY_KEY") ?? "";

    const response = await fetch(AI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 1200,
        temperature: 0.4,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (response.status === 429) {
      throw new Error("AI rate limit reached. Please try again in a moment.");
    }

    if (response.status === 402) {
      throw new Error(
        "AI API credits exhausted. Please check your API key configuration."
      );
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`AI API error ${response.status}: ${text.slice(0, 200)}`);
    }

    const aiResponse = await response.json();
    const rawContent: string =
      aiResponse.choices?.[0]?.message?.content ?? "{}";

    // Strip markdown code blocks if present
    const cleaned = rawContent
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    console.error("[ai-recommendations]", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
