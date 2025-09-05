'use client'

import Image from 'next/image'

interface WebsiteImageProps {
  websiteName: string
  alt: string
  width: number
  height: number
  style?: React.CSSProperties
  className?: string
}

export default function WebsiteImage({ 
  websiteName, 
  alt, 
  width, 
  height, 
  style,
  className 
}: WebsiteImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to text if image fails to load
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      parent.innerHTML = `<div class="text-gray-500 font-bold text-lg">${(websiteName || 'W').charAt(0)}</div>`;
    }
  }

  return (
    <Image 
      alt={alt} 
      width={width} 
      height={height} 
      style={style}
      className={className}
      src={`https://firebasestorage.googleapis.com/v0/b/virtualnod-storage.firebasestorage.app/o/hustleworthy%2Flogo-images%2F${websiteName}.png?alt=media`}
      onError={handleError}
    />
  )
}