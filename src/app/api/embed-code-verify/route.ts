// src/app/api/fetch-html/route.ts
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { getRequestIp, verifyTurnstileToken } from "@/lib/turnstile";

async function fetchHtmlWithCaptcha(
  targetUrl: string | null,
  turnstileToken: string | null | undefined,
  headers: Headers
) {
  if (!targetUrl) {
    return NextResponse.json({ error: "Missing ?url parameter" }, { status: 400 });
  }

  const turnstileResult = await verifyTurnstileToken(
    turnstileToken,
    getRequestIp(headers)
  );

  if (!turnstileResult.success) {
    return NextResponse.json(
      {
        error: turnstileResult.error,
        errorCodes: turnstileResult.errorCodes,
      },
      { status: turnstileResult.status }
    );
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");
  const turnstileToken = searchParams.get("turnstileToken") || searchParams.get("cf-turnstile-response");

  return fetchHtmlWithCaptcha(targetUrl, turnstileToken, request.headers);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const targetUrl = typeof body.url === 'string' ? body.url : null;
  const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken : null;

  return fetchHtmlWithCaptcha(targetUrl, turnstileToken, request.headers);
}
