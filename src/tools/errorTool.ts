import { ESLint } from "eslint";
export interface ExtendedAnalysisSummary {
  errorCount: number;      // High Priority issues (Breaking errors)
  warningCount: number;    // Medium Priority issues (Warnings)
  totalFiles: number;
  syntaxErrors: number;    // Count of syntax errors
  typeErrors: number;      // Count of type errors
  lintingViolations: number; // Count of other linting violations (style, etc.)
}
/**
 * Run ESLint on the given directory (or file pattern) and aggregate the results.
 */
export async function runStaticAnalysis(
  target: string = "./src" // default to src folder; adjust as needed
): Promise<ExtendedAnalysisSummary> {
  // Initialize ESLint and disable file ignoring
  const eslint = new ESLint({
    overrideConfigFile: "./eslint.config.js",
    ignore: false,
  });
  // Lint files (targeting all TypeScript files under src)
  const results = await eslint.lintFiles(["src/**/*.ts"]);
  let errorCount = 0;
  let warningCount = 0;
  let syntaxErrors = 0;
  let typeErrors = 0;
  let lintingViolations = 0;
  for (const result of results) {
    errorCount += result.errorCount;
    warningCount += result.warningCount;
    // Go through each message in the result to do categorization
    for (const msg of result.messages) {
      const lowerMsg = msg.message.toLowerCase();
      if (lowerMsg.includes("parsing error")) {
        syntaxErrors++;
      } else if (lowerMsg.includes("type")) {
        typeErrors++;
      } else {
        lintingViolations++;
      }
    }
  }
  return {
    errorCount,
    warningCount,
    totalFiles: results.length,
    syntaxErrors,
    typeErrors,
    lintingViolations,
  };
}
/**
 * Format a summary report based on analysis results.
 */
export function formatAnalysisSummary(summary: ExtendedAnalysisSummary): string {
  const {
    errorCount,
    warningCount,
    totalFiles,
    syntaxErrors,
    typeErrors,
    lintingViolations,
  } = summary;
  const status = errorCount > 0 ? "error" : "info";
  // Create a summary message without timestamp (as per previous changes)
  const message = `
[Static Code Error Report]
Analyzed Files: ${totalFiles}
High Priority (Breaking Errors): ${errorCount}
Medium Priority (Warnings): ${warningCount}
  - Syntax Errors: ${syntaxErrors}
  - Type Errors: ${typeErrors}
  - Linting Violations: ${lintingViolations}
Status: ${status}
  `.trim();
  return message;
}
