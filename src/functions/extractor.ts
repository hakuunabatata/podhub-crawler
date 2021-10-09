import { Page } from "puppeteer";
import { Video } from "../types";

export const extract = async (page: Page): Promise<Video[]> =>
  page.evaluate(() =>
    [...document.querySelectorAll("ytd-grid-video-renderer")].map((item) => ({
      title: (item.querySelector("#video-title") as any)?.innerText || "",
      url: item.querySelector("#video-title")?.getAttribute("href") || "",
    }))
  );
