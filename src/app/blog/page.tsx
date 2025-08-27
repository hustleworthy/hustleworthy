import { client } from "@/lib/microcms";
import BlogListing from '@/components/blog/BlogListing';
import Footer from '@/components/Footer';

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
};

export default async function BlogPage() {
  const INITIAL_LIMIT = 6;
  
  // Fetch initial blog posts with pagination
  const data = await client.get<{ contents: Blog[]; totalCount: number }>({ 
    endpoint: "blog",
    queries: {
      limit: INITIAL_LIMIT,
      orders: '-publishedAt', // Order by published date, newest first
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="hero-banner relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        <div className="wave-animation absolute inset-0 opacity-30"></div>
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Our Blog
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Discover insights, tips, and stories from our community of website reviewers and money-making enthusiasts.
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-6 py-16">
        <BlogListing 
          initialPosts={data.contents}
          totalCount={data.totalCount}
          initialLimit={INITIAL_LIMIT}
        />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
