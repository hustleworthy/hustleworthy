import { client } from "@/lib/microcms";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const offset = parseInt(searchParams.get('offset') || '0');
    const limit = parseInt(searchParams.get('limit') || '6');

    // Fetch blog posts with pagination
    const data = await client.get({
      endpoint: "blog",
      queries: {
        offset,
        limit,
        orders: '-publishedAt', // Order by published date, newest first
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
