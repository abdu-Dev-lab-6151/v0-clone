import { Template, defaultBuildLogger } from "e2b";
import { template } from "./template.js";

async function buildMyTemplate() {
  console.log("⏳ ቴምፕሌቱ ወደ E2B ክላውድ እየተሰቀለና እየተገነባ ነው...");

  try {
    const rawApiKey = "E2B_API_KEY"; // ⚠️ የአንተን API Key እዚህ አስገባ
    const cleanApiKey = rawApiKey.replace(/[^\x00-\x7F]/g, "").trim(); // ድብቅ ቁምፊዎችን ማጽጃ

    // የV2 ትክክለኛ አደራደር፡ (template, 'alias_name', { options })
    const buildInfo = await Template.build(template, "my-nextjs-template", {
      apiKey: cleanApiKey,
      onBuildLogs: defaultBuildLogger(), // የቢልድ ሂደቱን ሎግ በተርሚናል ላይ ያሳየናል
    });

    console.log("✅ ቴምፕሌቱ በተሳካ ሁኔታ ተፈጥሯል!");
    console.log(`📌 የመነጨው Template ID: ${buildInfo.templateId}`);
  } catch (error) {
    console.error("❌ ቴምፕሌት በሚገነባበት ወቅት ስህተት አጋጥሟል:", error);
  }
}

buildMyTemplate();
