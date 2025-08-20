'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { slugify } from '@/lib/slugify';

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

interface BlogListingProps {
  initialPosts: Blog[];
  totalCount: number;
  initialLimit: number;
}

export default function BlogListing({ initialPosts, totalCount, initialLimit }: BlogListingProps) {
  const [posts, setPosts] = useState<Blog[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length < totalCount);

  const loadMorePosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blog?offset=${posts.length}&limit=${initialLimit}`);
      const data = await response.json();
      
      if (data.contents && data.contents.length > 0) {
        setPosts(prev => [...prev, ...data.contents]);
        setHasMore(posts.length + data.contents.length < totalCount);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No blog posts yet</h3>
        <p className="text-gray-500">Check back soon for exciting content!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
          >
            {/* Thumbnail */}
            {post.thumbnail && (
              <div className="relative overflow-hidden h-48">
                <Image
                  src={post.thumbnail.url}
                  alt={post.title}
                  width={post.thumbnail.width || 400}
                  height={post.thumbnail.height || 200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}
            
            {/* Content */}
            <div className="p-6">
              <Link href={`/blog/${slugify(post.title)}`}>
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {post.description}
              </p>
              
              {/* Meta Information */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {/* Author */}
                <div className="flex items-center space-x-3">
                  {post.writer?.image ? (
                    <Image
                      src={post.writer.image.url}
                      alt={post.writer.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                      {post.writer?.name?.charAt(0) || '?'}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {post.writer?.name}
                  </span>
                </div>
                
                {/* Read Time Estimate */}
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>5 min read</span>
                </div>
              </div>
              
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.slice(0, 3).map((tag: Tag) => (
                    <span 
                      key={tag.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                    >
                      #{tag.name}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                      +{post.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
              
              {/* Read More Button */}
              <div className="mt-6">
                <Link 
                  href={`/blog/${slugify(post.title)}`}
                  className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200 text-center"
                >
                  Read Full Article
                  <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {/* Load More Section */}
      {hasMore && (
        <div className="text-center mt-16">
          <button 
            onClick={loadMorePosts}
            disabled={loading}
            className="inline-flex items-center px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 font-semibold rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading More Articles...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Load More Articles
              </>
            )}
          </button>
        </div>
      )}
      
      {/* Show total count */}
      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          Showing {posts.length} of {totalCount} articles
        </p>
      </div>
    </>
  );
}
