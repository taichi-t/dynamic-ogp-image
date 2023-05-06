const express = require("express");
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

const app = express();
const port = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  try {
    const screenshot = await takeScreenshot(
      "https://template-i5kot4zjma-an.a.run.app/"
    );
    res.status(200).set("Content-Type", "image/png");
    res.send(screenshot);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while taking the screenshot.");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
