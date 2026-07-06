const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  
  const userData = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const prompt = `You are a brutally honest business diagnostician.
  Brand: ${userData.brandName || "Not specified"}
  Industry: ${userData.industry || "Not specified"}
  Revenue: ${userData.monthlyRevenue || "Not specified"}
  Audience Size: ${userData.audienceSize || "Not specified"}
  Conversion Rate: ${userData.conversionRate || "Not specified"}
  Traffic Source: ${userData.trafficSource || "Not specified"}
  
  Return ONLY valid JSON with these fields:
  brandPerformance, funnelWeaknesses, audienceAcquisition,
  contentEfficiency, conversionBottlenecks, competitivePressure,
  growthForecast, priorityFixes, scores, pressureData`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const json = text.match(/\{[\s\S]*\}/);
  res.json(JSON.parse(json[0]));
}