'use client'


interface WebsiteImageProps {
  websiteName: string
  alt: string
  width?: string
  height?: string
  style?: React.CSSProperties
  className?: string
}

export default function WebsiteImage({ 
  websiteName, 
  alt, 
  width = "100px", 
  height = "100px", 
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
    <img 
      alt={alt} 
      style={style}
      className={className + " w-[100px] h-auto object-cover"}
      src={`https://firebasestorage.googleapis.com/v0/b/virtualnod-storage.firebasestorage.app/o/hustleworthy%2Flogo-images%2F${websiteName}.png?alt=media`}
      onError={handleError}
    />
  )
}