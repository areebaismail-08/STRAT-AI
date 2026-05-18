document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const outputContainer = document.getElementById("output");

    if (!form || !outputContainer) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const companyName =
            document.getElementById("company")?.value || "This brand";

        const industry =
            document.getElementById("industry")?.value || "this industry";

        const targetAudience =
            document.getElementById("audience")?.value || "general users";

        const competitors =
            document.getElementById("competitors")?.value || "competitors";

        const differentiator =
            document.getElementById("differentiator")?.value || "its offer";



        // POSITIONING SCORE

        let score = 50;

        if (targetAudience.length > 10) score += 10;
        if (differentiator.length > 15) score += 15;
        if (competitors.length > 5) score += 5;

        score = Math.min(score, 95);



        // WEAKNESSES

        const weaknesses = [];

        if (targetAudience.includes("everyone")) {
            weaknesses.push(
                "Your audience is too broad. Broad messaging weakens positioning."
            );
        }

        if (differentiator.length < 15) {
            weaknesses.push(
                "Your differentiation is vague. Buyers won't instantly understand why you matter."
            );
        }

        if (competitors.length < 5) {
            weaknesses.push(
                "You lack competitor awareness. That creates strategic blind spots."
            );
        }

        while (weaknesses.length < 3) {
            weaknesses.push(
                "Your messaging still feels generic compared to stronger brands."
            );
        }



        // AUDIENCE INSIGHT

        const audienceInsight = `${targetAudience} care more about outcomes than features. They want faster, simpler, lower-risk solutions.`;


        // TREND

        const trendOpportunity = `${industry} is shifting toward AI-assisted workflows, automation, and personalization. Brands that simplify decisions will outperform feature-heavy competitors.`;


        // COMPETITOR OPPORTUNITY

        const competitorOpportunity = `Most competitors focus on features. ${companyName} can stand out by focusing on clarity, speed, and trust.`;



        // RENDER OUTPUT

        outputContainer.innerHTML = `

        <div class="research-card">
            <h3>📊 Positioning Score</h3>
            <p><strong>${score}/100</strong></p>
        </div>

        <div class="research-card">
            <h3>⚠️ Top Weaknesses</h3>
            <ul>
                ${weaknesses.map(w => `<li>${w}</li>`).join("")}
            </ul>
        </div>

        <div class="research-card">
            <h3>🎯 Audience Insight</h3>
            <p>${audienceInsight}</p>
        </div>

        <div class="research-card">
            <h3>📈 Trend Opportunity</h3>
            <p>${trendOpportunity}</p>
        </div>

        <div class="research-card">
            <h3>⚔️ Competitor Opportunity</h3>
            <p>${competitorOpportunity}</p>
        </div>

        `;

    });

});