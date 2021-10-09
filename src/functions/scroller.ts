import { Page } from "puppeteer";

export const scroll = async (page: Page): Promise<void> =>
  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, 500);
        totalHeight += 500;

        if (
          totalHeight >=
          (document.querySelector("ytd-two-column-browse-results-renderer")
            ?.scrollHeight || 0)
        ) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  });
