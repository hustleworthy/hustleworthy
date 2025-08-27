'use client'

import React from 'react'

interface VideoReviewProps {
  websiteName: string
}

export default function VideoReview({ websiteName }: VideoReviewProps) {
  const videoUrl = `https://firebasestorage.googleapis.com/v0/b/virtualnod-storage.firebasestorage.app/o/hustleworthy%2Fvideos%2F${websiteName}.mp4?alt=media`;
  const [videoExists, setVideoExists] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkVideoExists = async () => {
      try {
        const response = await fetch(videoUrl, { method: 'HEAD' });
        setVideoExists(response.ok);
      } catch (error) {
        setVideoExists(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkVideoExists();
  }, [videoUrl]);

  if (isLoading) return null;
  if (!videoExists) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Review</h2>
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <video 
          className="w-full h-full object-cover"
          controls
          preload="metadata"
          poster=""
        >
          <source 
            src={videoUrl} 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="text-gray-600 mt-4 text-center">
        Watch our comprehensive video review of {websiteName || 'this platform'}
      </p>
    </div>
  );
}
