import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from './i18n'

function getPreferredLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale as typeof locales[number])) {
    return cookieLocale
  }

  const acceptLang = request.headers.get('accept-language')
  if (acceptLang) {
    for (const part of acceptLang.split(',')) {
      const lang = part.split(';')[0].trim().split('-')[0].toLowerCase()
      if (locales.includes(lang as typeof locales[number])) return lang
    }
  }

  return defaultLocale
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(.+)$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  const pathnameLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (pathnameLocale) {
    const headers = new Headers(request.headers)
    headers.set('x-locale', pathnameLocale)
    return NextResponse.next({ request: { headers } })
  }

  const locale = getPreferredLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
