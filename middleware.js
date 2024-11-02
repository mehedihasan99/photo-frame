import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse } from 'next/server'

let locales = ['en', 'bn']
let defaultLocale = 'en'
function getLocale(request) {
  const acceptedLanguage = request.headers.get('accept-language') ?? undefined
  let headers = { 'accept-language': acceptedLanguage }
  let languages = new Negotiator({ headers }).languages()
  return match(languages, locales, defaultLocale)
}
export function middleware(request) {
  //* ----- Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameHasLocale) return

  //* ------- Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    '/((?!api|assets|.*\\..*|_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
