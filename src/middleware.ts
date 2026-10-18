import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow unauthenticated access to login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Allow public API routes (enquiry, careers, metals) - they handle their own auth
  if (
    pathname.startsWith('/api/enquiry') ||
    pathname.startsWith('/api/careers') ||
    pathname.startsWith('/api/metals')
  ) {
    return NextResponse.next();
  }

  // Create response first so Supabase can set session cookies on it
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to login page for protected routes
    return NextResponse.redirect(new URL('/admin/login', request.url), {
      status: 303,
    });
  }

  // Let the request proceed - pages and APIs will do their own auth verification
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};