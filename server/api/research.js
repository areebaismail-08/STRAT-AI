const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  
  const userData = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const prompt = `You are an elite market intelligence analyst...
  Brand: ${userData.brandName || "Not specified"}
  Industry: ${userData.industry || "Not specified"}
  Competitors: ${userData.competitors || "Not specified"}
  
  Return ONLY valid JSON with these fields:
  brandPosition, audiencePerception, contentPatterns, 
  marketReality, competitorPatterns, opportunities, 
  projection, risks`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const json = text.match(/\{[\s\S]*\}/);
  res.json(JSON.parse(json[0]));
}