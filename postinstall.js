import * as fs from "fs";
import * as path from "path";


const projectRoot = process.cwd();
const configFilePath = path.join(projectRoot, "error-agent.config.json");

if (!fs.existsSync(configFilePath)) {
  const defaultConfig = {
    codeBasePath: "./src",
    errorThreshold: 1,
    interval: "*/15 * * * *"
  };

  fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
  console.log("Error-Agent configuration file created at:", configFilePath);
} else {
  console.log("Error-Agent configuration file already exists at:", configFilePath);
}


const runApmFilePath = path.join(projectRoot, "error-agent.ts");

if (!fs.existsSync(runApmFilePath)) {
  const runApmContent = `
// It runs static analysis on your codebase and outputs a report into your telex channel.

import { runStaticAnalysis} from "telex-error-agent"

async function analyze() {
  try {
    const summary = await runStaticAnalysis("./src");
  } catch (error) {
    console.error("Error running static analysis:", error);
  }
}

analyze();
`.trim();

  fs.writeFileSync(runApmFilePath, runApmContent);
  console.log("run-apm.js file created at:", runApmFilePath);
} else {
  console.log("run-apm.js file already exists at:", runApmFilePath);
}