const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  
  const userData = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const prompt = `You are an elite creative strategist and copywriter.
  Brand: ${userData.brandName || "Not specified"}
  Product: ${userData.product || "Not specified"}
  Audience: ${userData.audience || "Not specified"}
  Platform: ${userData.platform || "Not specified"}
  Content Type: ${userData.contentType || "Not specified"}
  Campaign Goal: ${userData.campaignGoal || "Not specified"}
  Emotional Trigger: ${userData.emotionalTrigger || "Not specified"}
  
  Return ONLY valid JSON with these fields:
  psychologyReasoning, mainContent, hookStrategy,
  ctaReasoning, visualDirection`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const json = text.match(/\{[\s\S]*\}/);
  res.json(JSON.parse(json[0]));
}