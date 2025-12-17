/**
 * Helper function to get the correct image URL
 * Supports both legacy local uploads and Vercel Blob URLs
 */
export function getImageUrl(filename: string): string {
  // If it's already a full URL (Vercel Blob), return as-is
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename
  }
  
  // Legacy format: local file path
  return `/uploads/${filename}`
}

