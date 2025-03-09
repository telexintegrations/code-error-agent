import { ESLint } from "eslint";
export interface ExtendedAnalysisSummary {
  errorCount: number;      
  warningCount: number;    
  totalFiles: number;
  syntaxErrors: number;   
  typeErrors: number;     
  lintingViolations: number; 
}

export async function runStaticAnalysis(
  target: string = "./src" 
): Promise<ExtendedAnalysisSummary> {
  const eslint = new ESLint({
    overrideConfigFile: "./eslint.config.js",
    ignore: false,
  });
  const results = await eslint.lintFiles(["src/**/*.ts"]);
  let errorCount = 0;
  let warningCount = 0;
  let syntaxErrors = 0;
  let typeErrors = 0;
  let lintingViolations = 0;
  for (const result of results) {
    errorCount += result.errorCount;
    warningCount += result.warningCount;
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