// src/mastra/tools/errorTool.ts
import { ESLint } from "eslint";

export interface AnalysisSummary {
  errorCount: number; // High Priority issues
  warningCount: number; // Medium Priority issues
  totalFiles: number;
}

/**
 * Run ESLint on the given directory (or file pattern)
 * and aggregate the results.
 */
export async function runStaticAnalysis(
  target: string = "./src" // default to src folder; adjust as needed
): Promise<AnalysisSummary> {
  // Initialize ESLint and disable file ignoring
  const eslint = new ESLint({
    overrideConfigFile: "./eslint.config.js",
    ignore: false,
  });

  // Lint files (targeting all TypeScript files under src)
  const results = await eslint.lintFiles(["src/**/*.ts"]);

  let errorCount = 0;
  let warningCount = 0;

  results.forEach((result) => {
    errorCount += result.errorCount;
    warningCount += result.warningCount;
  });

  return {
    errorCount,
    warningCount,
    totalFiles: results.length,
  };
}

/**
 * Format a summary report based on analysis results.
 */
export function formatAnalysisSummary(summary: AnalysisSummary): string {
  const { errorCount, warningCount, totalFiles } = summary;
  const status = errorCount > 0 ? "error" : "info";

  // Create a summary message without a timestamp
  const message = `
[Static Code Error Report]
Analyzed Files: ${totalFiles}
High Priority (Errors): ${errorCount}
Medium Priority (Warnings): ${warningCount}
Status: ${status}
  `.trim();

  return message;
}
