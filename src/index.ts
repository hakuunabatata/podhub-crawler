import puppeteer from "puppeteer";
import { scroll } from "./functions/scroller";
import podcasts from "./podcasts.json";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  for (const { name, url } of podcasts) {
    try {
      await page.goto(`https://www.youtube.com/c/${url}/videos`);
      await page.waitForSelector("#primary");

      await scroll(page);
    } catch (err) {
      console.log(err);
    }
  }

  await browser.close();
})();
