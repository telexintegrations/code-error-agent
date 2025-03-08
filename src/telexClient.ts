// src/mastra/telexClient.ts
import fetch from "node-fetch";

const TELELEX_TARGET_URL =
  process.env.TELEX_TARGET_URL ||
  "https://ping.telex.im/v1/webhooks/01957751-701a-7cd9-8d06-1c1b4bc022a4";

export async function sendMessageToTelex(message: string): Promise<void> {
  try {
    const payload = {
      message,
      username: "Log Error Tracker",
      event_name: "Static Code Error Report",
      // status can be inferred from the message or passed as part of the message if needed
    };

    const response = await fetch(TELELEX_TARGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Log-Error-Tracker/1.0.0",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Telex API responded with status ${response.status}`);
    }
    console.log("Message successfully sent to Telex.");
  } catch (error) {
    console.error("Error sending message to Telex:", error);
  }
}

if (require.main === module) {
  sendMessageToTelex("Test message from Telex client")
    .then(() => console.log("Test message sent."))
    .catch((err) => console.error("Test failed:", err));
}
