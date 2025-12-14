// Utility functions to manage auth tokens in both localStorage and cookies

export function setAuthToken(token: string) {
  // Set in localStorage
  localStorage.setItem("authToken", token)
  
  // Set in cookies (for middleware)
  document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem("authToken")
}

export function removeAuthToken() {
  // Remove from localStorage
  localStorage.removeItem("authToken")
  
  // Remove from cookies
  document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}