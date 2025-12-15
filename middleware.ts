import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isProtectedRoute = pathname.startsWith('/student') || pathname.startsWith('/teacher');

  if (isProtectedRoute) {
    // Check for authentication token (placeholder for Supabase auth cookie)
    // In a real Supabase app, you'd use updateSession from utils/supabase/middleware
    // or check for 'sb-<project-id>-auth-token'
    // For now, we simulate by checking a generic auth cookie or header
    // If you haven't implemented auth yet, this will ALWAYS redirect, which is what we want for demo
    
    // User requested: "If no login info, jump to login page"
    // Let's assume 'auth-token' is our session cookie for now
    const hasAuth = request.cookies.has('sb-access-token') || request.cookies.has('auth-token'); 

    if (!hasAuth) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      // Optional: Save the return URL to redirect back after login
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
