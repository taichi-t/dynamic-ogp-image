const puppeteer = require("puppeteer");

async function takeScreenshot(url) {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--headless",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--remote-debugging-port=9222",
      "--remote-debugging-address=0.0.0.0",
    ],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  const screenshot = await page.screenshot();
  await browser.close();
  return screenshot;
}

// Cloud Runのエンドポイント
exports.screenshotHandler = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    res.status(400).send("URL parameter is missing.");
    return;
  }

  try {
    const screenshot = await takeScreenshot(url);
    res.set("Content-Type", "image/png");
    res.send(screenshot);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while taking the screenshot.");
  }
};
