// src/mastra/index.ts
import "dotenv/config"; 
import { runStaticAnalysis, formatAnalysisSummary } from "./tools/errorTool";


async function main() {
  console.log("Starting Static Code Analysis...");

  try {
    const analysisSummary = await runStaticAnalysis("./src");
    console.log("Static analysis complete:", analysisSummary);

    const summaryMessage = formatAnalysisSummary(analysisSummary);
    console.log("Formatted Error Report:\n", summaryMessage);

    
  } catch (error) {
    console.error("An error occurred during static analysis:", error);
  }
}

main();
