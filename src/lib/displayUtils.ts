/**
 * Extracts a display name from a user name that might be an email address
 * If the name looks like an email, returns only the username part (before @)
 * Otherwise returns the original name
 */
export function getDisplayName(name: string): string {
  if (!name) return '';
  
  // Check if the name looks like an email (contains @ and has text before and after it)
  const emailRegex = /^([^@\s]+)@[^@\s]+\.[^@\s]+$/;
  const match = name.match(emailRegex);
  
  if (match) {
    // Return the username part (before @)
    return match[1];
  }
  
  // Return the original name if it doesn't look like an email
  return name;
}
