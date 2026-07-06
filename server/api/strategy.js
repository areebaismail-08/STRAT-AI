const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  
  const userData = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const prompt = `You are a brutally honest senior marketing strategist.
  Brand: ${userData.brandName || "Not specified"}
  Product: ${userData.product || "Not specified"}
  Audience: ${userData.audience || "Not specified"}
  Platform: ${userData.platform || "Not specified"}
  Budget: ${userData.budget || "Not specified"}
  Timeline: ${userData.timeline || "Not specified"}
  
  Return ONLY valid JSON with these fields:
  businessRealityCheck, marketingWeaknesses, audiencePsychology,
  strategicOpportunities, smartFramework, platformStrategy,
  campaignRecommendations, actionPlan, riskWarnings`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const json = text.match(/\{[\s\S]*\}/);
  res.json(JSON.parse(json[0]));
}