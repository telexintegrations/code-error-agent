// import { Router, Request, Response } from "express";
// import { runStaticAnalysis, formatAnalysisSummary } from "../tools/errorTool";
// import { sendMessageToTelex } from "../telexClient";

// const router = Router();

// router.post("/tick", async (req: Request, res: Response) => {
//   try {
//     // Immediately respond with 202 Accepted
//     res.status(202).json({ status: "accepted" });

//     // Run static analysis on the codebase (default target is "./src")
//     const summary = await runStaticAnalysis();
//     const report = formatAnalysisSummary(summary);
//     console.log("Static analysis report:\n", report);

//     // Send the analysis report to Telex
//     await sendMessageToTelex(report);

//     console.log("Tick: Completed static analysis and report sent to Telex.");
//   } catch (error: any) {
//     console.error("Tick: Error during static analysis or sending report:", error);

//     // Optionally, if the request body contains a return_url, try notifying Telex about the error
//     if (req.body?.return_url) {
//       try {
//         await sendMessageToTelex(`❌ Tick Error: ${error.message}`);
//       } catch (notifyError) {
//         console.error("Tick: Failed to notify Telex about error:", notifyError);
//       }
//     }
//   }
// });

// export default router;


import { Router, Request, Response } from "express";
import { runStaticAnalysis, formatAnalysisSummary } from "../tools/errorTool";
import fetch from "node-fetch";
const router = Router();
router.post("/tick", async (req: Request, res: Response) => {
  let payload: any;
  try {
    // Immediately respond with 202 Accepted
    res.status(202).json({ status: "accepted" });
    payload = req.body;
    // Run static analysis to generate a report
    const summary = await runStaticAnalysis();
    const report = formatAnalysisSummary(summary);
    console.log(`[${new Date().toISOString()}] Static analysis report:\n`, report);
    // Send the report directly using the return_url from the request body
    await fetch(payload.return_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Code Error Agent/1.0.0",
      },
      body: JSON.stringify({
        message: report,
        username: "Code Error Agent",
        event_name: "Static Code Error Report",
        status: summary.errorCount > 0 ? "error" : "info",
        timestamp: new Date().toISOString(),
        performed_by: "your-username", // Update this as needed
        metadata: {
          source: "static analysis",
        },
      }),
    });
    console.log(
      `[${new Date().toISOString()}] Completed static analysis and report sent.`
    );
  } catch (error: any) {
    console.error(`[${new Date().toISOString()}] Error in tick endpoint:`, error);
    if (payload?.return_url) {
      try {
        await fetch(payload.return_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Code Error Agent/1.0.0",
          },
          body: JSON.stringify({
            message: `❌ Error checking code: ${error.message}`,
            username: "Code Error Agent",
            event_name: "Static Analysis Error",
            status: "error",
            timestamp: new Date().toISOString(),
            performed_by: "your-username", // Update as needed
            metadata: {
              error: error.message,
            },
          }),
        });
      } catch (notifyError) {
        console.error(
          `[${new Date().toISOString()}] Failed to notify Telex about error:`,
          notifyError
        );
      }
    }
  }
});
export default router;