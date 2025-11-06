'use client';

import { useRef, useState, useEffect } from 'react';

interface VideoWithOverlayProps {
  src: string;
  className?: string;
}

export default function VideoWithOverlay({ src, className = "h-[80px] w-[120px]" }: VideoWithOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlayClick = async () => {
    if (videoRef.current) {
      try {
        // Request fullscreen first
        await videoRef.current.requestFullscreen();
        // Then play the video
        await videoRef.current.play();
        setShowOverlay(false);
      } catch (error) {
        // Fallback: just play without fullscreen if fullscreen fails
        console.log('Fullscreen not supported or denied, playing normally');
        videoRef.current.play();
        setShowOverlay(false);
      }
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setShowOverlay(false);
      } else {
        videoRef.current.pause();
        setShowOverlay(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setShowOverlay(true);
  };

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      
      // If we exit fullscreen and video is paused, show overlay
      if (!isCurrentlyFullscreen && videoRef.current?.paused) {
        setShowOverlay(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <video 
        ref={videoRef}
        preload="metadata"
        className={`${className} cursor-pointer rounded-lg`}
        onClick={handleVideoClick}
        onEnded={handleVideoEnded}
        controls={isFullscreen}
      >
        <source 
          src={src}
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      
      {/* Video Overlay with Play Button */}
      {showOverlay && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center cursor-pointer rounded-lg transition-opacity hover:bg-opacity-50"
          onClick={handlePlayClick}
        >
          {/* Play Button Icon */}
          <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-all">
            <svg 
              className="w-6 h-6 text-gray-800 ml-0.5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
