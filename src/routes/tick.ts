import { Router, Request, Response } from "express";
import { runStaticAnalysis, formatAnalysisSummary } from "../tools/errorTool";
import { sendMessageToTelex } from "../telexClient";

const router = Router();

router.post("/tick", async (req: Request, res: Response) => {
  try {
    // Immediately respond with 202 Accepted
    res.status(202).json({ status: "accepted" });

    // Run static analysis on the codebase (default target is "./src")
    const summary = await runStaticAnalysis();
    const report = formatAnalysisSummary(summary);
    console.log("Static analysis report:\n", report);

    // Send the analysis report to Telex
    await sendMessageToTelex(report);

    console.log("Tick: Completed static analysis and report sent to Telex.");
  } catch (error: any) {
    console.error("Tick: Error during static analysis or sending report:", error);

    // Optionally, if the request body contains a return_url, try notifying Telex about the error
    if (req.body?.return_url) {
      try {
        await sendMessageToTelex(`❌ Tick Error: ${error.message}`);
      } catch (notifyError) {
        console.error("Tick: Failed to notify Telex about error:", notifyError);
      }
    }
  }
});

export default router;
