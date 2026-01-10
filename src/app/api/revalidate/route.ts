import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from microCMS (optional but recommended)
    const secret = request.nextUrl.searchParams.get('secret');
    
    // Set your secret in Vercel environment variables
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Revalidate the blog listing page
    revalidatePath('/blog');
    
    // If a specific post slug is provided, revalidate that page too
    if (body.slug) {
      revalidatePath(`/blog/${body.slug}`);
    } else if (body.title) {
      // If title is provided, convert to slug and revalidate
      const { slugify } = await import('@/lib/slugify');
      const slug = slugify(body.title);
      revalidatePath(`/blog/${slug}`);
    }
    
    // Also revalidate the home page if it shows blog posts
    revalidatePath('/');
    
    // Revalidate the sitemap
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      paths: ['/blog', body.slug ? `/blog/${body.slug}` : null, '/'].filter(Boolean)
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Allow GET requests for testing (remove in production or add auth)
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    );
  }

  try {
    revalidatePath('/blog');
    revalidatePath('/');
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'Cache revalidated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}

