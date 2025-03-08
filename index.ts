import createApp from "./src/app";
// import config from "./src/config";

if (require.main === module) {
  const app = createApp();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`[2025-02-20 22:25:37] Code Error Agent started on port ${port}`);
    // console.log("Configuration:", config);
  });
}

export default createApp;
