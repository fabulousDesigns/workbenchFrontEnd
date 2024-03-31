// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Get the user data from the local storage
  const userDataString = req.cookies.get('userData')?.value || localStorage.getItem('userData');

  // Check if the user data exists and contains an access_token
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    if (userData.access_token) {
      // User is authenticated, allow access
      return NextResponse.next();
    }
  }

  // Redirect to the login page if the user is not authenticated
  const url = req.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/dashboard',
};