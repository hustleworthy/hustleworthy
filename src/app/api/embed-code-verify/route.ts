// src/app/api/fetch-html/route.ts
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing ?url parameter" }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: "networkidle2" });

    const html = await page.content();
    await browser.close();

    return NextResponse.json({ html });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
