import puppeteer from "puppeteer";
import { extract } from "./functions/extractor";
import { scroll } from "./functions/scroller";
import podcasts from "./podcasts.json";
import fs from "fs";
import { Video } from "./types";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  let videos: Video[] = [];

  for (const { url, name } of podcasts) {
    try {
      await page.goto(`https://www.youtube.com/c/${url}/videos`);
      await page.waitForSelector("#primary");

      await scroll(page);

      const extracted = await extract(page);

      videos.push(...extracted);

      await fs.writeFileSync("./src/videos.json", JSON.stringify(videos));
    } catch (err) {
      console.log(err);
    }
  }

  await browser.close();
})();
