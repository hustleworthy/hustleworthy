import { client } from "@/lib/microcms";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { slugify, findPostBySlug } from '@/lib/slugify';
import Footer from '@/components/Footer';

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

type Tag = {
  id: string;
  name: string;
};

type Writer = {
  id: string;
  name: string;
  profile: string;
  image?: {
    url: string;
    height: number;
    width: number;
  };
};

type Blog = {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
  tags: Tag[];
  writer: Writer;
  publishedAt?: string;
  updatedAt?: string;
};

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  
  try {
    // Fetch all blog posts to find the one matching the slug
    const data = await client.get<{ contents: Blog[] }>({ endpoint: "blog" });
    
    // Find the post that matches the slug (converted from title)
    const post = findPostBySlug(data.contents, slug);

    if (!post) {
      notFound();
    }

    // Format the date
    const formatDate = (dateString?: string) => {
      if (!dateString) return 'Unknown date';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Calculate reading time (rough estimate)
    const calculateReadingTime = (content: string) => {
      const wordsPerMinute = 200;
      const wordCount = content.split(' ').length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);
      return readingTime;
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 blog-post">
        {/* Hero Section */}
        <div className="hero-banner relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
          <div className="wave-animation absolute inset-0 opacity-30"></div>
          <div className="relative z-10 container mx-auto px-6 py-20">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-blue-100">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-white font-medium">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Article Header */}
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {post.description}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-blue-100">
                {/* Author */}
                <div className="flex items-center space-x-3">
                  {post.writer?.image ? (
                    <Image
                      src={post.writer.image.url}
                      alt={post.writer.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-semibold border border-white/30">
                      {post.writer?.name?.charAt(0) || '?'}
                    </div>
                  )}
                  <span className="font-medium">
                    {post.writer?.name}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>

                {/* Reading Time */}
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{calculateReadingTime(post.content)} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {post.thumbnail && (
              <div className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={post.thumbnail.url}
                  alt={post.title}
                  width={post.thumbnail.width || 1200}
                  height={post.thumbnail.height || 600}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            {/* Article Content */}
            <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {post.tags.map((tag: Tag) => (
                    <span 
                      key={tag.id}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Article Body */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-blockquote:text-gray-600 prose-blockquote:border-blue-200 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Author Bio */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">About the Author</h3>
              <div className="flex items-start space-x-6">
                {post.writer?.image ? (
                  <Image
                    src={post.writer.image.url}
                    alt={post.writer.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-semibold border-4 border-gray-200">
                    {post.writer?.name?.charAt(0) || '?'}
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.writer?.name}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {post.writer?.profile || 'Content writer and money-making website expert at Hustleworthy.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 text-center">
              <a 
                href="/blog"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to Blog
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  
  try {
    // Fetch all blog posts to find the one matching the slug
    const data = await client.get<{ contents: Blog[] }>({ endpoint: "blog" });
    const post = findPostBySlug(data.contents, slug);

    if (!post) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    return {
      title: `${post.title} | Hustleworthy Blog`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: post.thumbnail ? [post.thumbnail.url] : [],
        type: 'article',
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [post.writer?.name || 'Hustleworthy Team'],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: post.thumbnail ? [post.thumbnail.url] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}
