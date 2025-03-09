import { Router, Request, Response } from "express";
import { runStaticAnalysis, formatAnalysisSummary } from "../tools/errorTool";
import fetch from "node-fetch";
const router = Router();
router.post("/tick", async (req: Request, res: Response) => {
  let payload: any;
  try {
    res.status(202).json({ status: "accepted" });
    payload = req.body;
    const summary = await runStaticAnalysis();
    const report = formatAnalysisSummary(summary);
    console.log(`[${new Date().toISOString()}] Static analysis report:\n`, report);
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
        performed_by: "your-username", 
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
            performed_by: "your-username", 
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