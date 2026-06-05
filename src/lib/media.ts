export function getFirebaseLogoUrl(websiteName: string) {
  const objectPath = `hustleworthy/logo-images/${websiteName}.png`
  return `https://firebasestorage.googleapis.com/v0/b/virtualnod-storage.firebasestorage.app/o/${encodeURIComponent(objectPath)}?alt=media`
}

export function getMicroCmsImageUrl(url: string, width?: number) {
  if (!width || !url.includes('images.microcms-assets.io')) {
    return url
  }

  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}w=${width}&auto=compress,format`
}
