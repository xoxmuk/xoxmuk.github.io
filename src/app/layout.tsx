import { headers } from 'next/headers'
import { ThemeProvider } from 'next-themes'
import { defaultLocale, locales } from '@/i18n'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const rawLocale = headersList.get('x-locale') ?? defaultLocale
  const lang = locales.includes(rawLocale as typeof locales[number])
    ? rawLocale
    : defaultLocale

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
