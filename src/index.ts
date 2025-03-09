// src/mastra/index.ts
import "dotenv/config"; // Ensure environment variables are loaded
import { runStaticAnalysis, formatAnalysisSummary } from "./tools/errorTool";


async function main() {
  console.log("Starting Static Code Analysis...");

  try {
    // Run ESLint-based static analysis on the target directory (e.g., './src')
    const analysisSummary = await runStaticAnalysis("./src");
    console.log("Static analysis complete:", analysisSummary);

    // Format the summary message for Telex
    const summaryMessage = formatAnalysisSummary(analysisSummary);
    console.log("Formatted Error Report:\n", summaryMessage);

    
  } catch (error) {
    console.error("An error occurred during static analysis:", error);
  }
}

main();
